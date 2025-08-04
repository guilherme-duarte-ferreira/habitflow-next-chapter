import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, TrendingUp } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import { useHabitLogs } from '@/hooks/useHabitLogs';
import { useNotes } from '@/hooks/useNotes';
import HabitCard from '@/components/HabitCard';
import NotesFeed from '@/components/NotesFeed';

const Dashboard = () => {
  const [showNotesFeed, setShowNotesFeed] = useState(false);
  const { data: habits, isLoading: habitsLoading } = useHabits();

  if (habitsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Meus Hábitos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-accent/50 rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-accent/30 rounded" />
                  <div className="h-3 bg-accent/30 rounded w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Meus Hábitos</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNotesFeed(!showNotesFeed)}
          className="hover:bg-accent"
          title="Mostrar/Ocultar Feed de Anotações"
        >
          <FileText className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits?.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
        
        {habits?.length === 0 && (
          <div className="col-span-full">
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum hábito ainda</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Comece criando seu primeiro hábito na barra lateral
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {showNotesFeed && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Feed de Anotações</h2>
          <NotesFeed />
        </div>
      )}
    </div>
  );
};

export default Dashboard;