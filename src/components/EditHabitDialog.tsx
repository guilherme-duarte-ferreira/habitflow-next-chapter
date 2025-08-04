import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdateHabit } from '@/hooks/useHabits';

interface EditHabitDialogProps {
  habit: { id: string; name: string } | null;
  onClose: () => void;
}

const EditHabitDialog = ({ habit, onClose }: EditHabitDialogProps) => {
  const [name, setName] = useState('');
  const updateHabit = useUpdateHabit();

  useEffect(() => {
    if (habit) {
      setName(habit.name);
    }
  }, [habit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habit && name.trim()) {
      updateHabit.mutate(
        { id: habit.id, name: name.trim() },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  return (
    <Dialog open={!!habit} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Hábito</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do hábito"
              className="w-full"
            />
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={updateHabit.isPending}>
              {updateHabit.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHabitDialog;