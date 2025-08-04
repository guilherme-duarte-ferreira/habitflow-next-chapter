import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Note } from '@/types';
import { toast } from 'sonner';

export const useNotes = (habitId?: string) => {
  return useQuery({
    queryKey: ['notes', habitId],
    queryFn: async () => {
      let query = supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (habitId === 'general') {
        query = query.is('habit_id', null);
      } else if (habitId) {
        query = query.eq('habit_id', habitId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Note[];
    },
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ content, habitId }: { content: string; habitId?: string }) => {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ content, habit_id: habitId || null }])
        .select()
        .single();
      
      if (error) throw error;
      return data as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Anotação criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar anotação');
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      const { data, error } = await supabase
        .from('notes')
        .update({ content })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Anotação atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar anotação');
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Anotação excluída com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir anotação');
    },
  });
};