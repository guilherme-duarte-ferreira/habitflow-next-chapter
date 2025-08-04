import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateHabit } from '@/hooks/useHabits';

const AddHabitForm = () => {
  const [habitName, setHabitName] = useState('');
  const createHabit = useCreateHabit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      createHabit.mutate(habitName.trim());
      setHabitName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Novo hábito..."
        className="w-full bg-background/50 border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2 px-4 transition text-sm"
        disabled={createHabit.isPending}
      >
        {createHabit.isPending ? 'Adicionando...' : 'Adicionar Hábito'}
      </Button>
    </form>
  );
};

export default AddHabitForm;