import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { HabitLog } from '@/types';
import { toast } from 'sonner';

export const useHabitLogs = (habitId?: string) => {
  return useQuery({
    queryKey: ['habit-logs', habitId],
    queryFn: async () => {
      let query = supabase
        .from('habit_logs')
        .select('*')
        .order('logged_at', { ascending: false });
      
      if (habitId) {
        query = query.eq('habit_id', habitId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as HabitLog[];
    },
    enabled: !!habitId,
  });
};

export const useCreateHabitLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ habitId, loggedAt }: { habitId: string; loggedAt: string }) => {
      const { data, error } = await supabase
        .from('habit_logs')
        .insert([{ habit_id: habitId, logged_at: loggedAt }])
        .select()
        .single();
      
      if (error) throw error;
      return data as HabitLog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habit-logs'] });
      toast.success('Atividade registrada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao registrar atividade');
    },
  });
};

export const useDeleteHabitLog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('habit_logs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habit-logs'] });
      toast.success('Registro excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir registro');
    },
  });
};