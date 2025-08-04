import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useHabits, useDeleteHabit, useUpdateHabit } from '@/hooks/useHabits';
import EditHabitDialog from './EditHabitDialog';
import { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface HabitsListProps {
  onHabitClick?: () => void;
}

const HabitsList = ({ onHabitClick }: HabitsListProps) => {
  const { data: habits, isLoading } = useHabits();
  const deleteHabit = useDeleteHabit();
  const [editingHabit, setEditingHabit] = useState<{ id: string; name: string } | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 bg-accent/20 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const handleDelete = (habitId: string) => {
    deleteHabit.mutate(habitId);
    setDeletingHabit(null);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-1">
          {habits?.map((habit) => (
            <div key={habit.id} className="group relative">
              <Link
                to={`/habit/${habit.id}`}
                onClick={onHabitClick}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition w-full text-left"
              >
                <span className="truncate flex-1 mr-2">{habit.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditingHabit({ id: habit.id, name: habit.name })}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setDeletingHabit(habit.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Link>
            </div>
          ))}
          {habits?.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-4">
              Nenhum hábito ainda.
              <br />
              Crie seu primeiro hábito acima!
            </p>
          )}
        </div>
      </div>

      <EditHabitDialog
        habit={editingHabit}
        onClose={() => setEditingHabit(null)}
      />

      <AlertDialog open={!!deletingHabit} onOpenChange={() => setDeletingHabit(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este hábito? Esta ação não pode ser desfeita e todos os registros e anotações relacionados serão perdidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeletingHabit(null)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deletingHabit && handleDelete(deletingHabit)}
              disabled={deleteHabit.isPending}
            >
              {deleteHabit.isPending ? 'Excluindo...' : 'Excluir'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HabitsList;