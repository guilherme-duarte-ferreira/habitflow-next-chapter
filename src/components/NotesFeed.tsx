import { useNotes } from '@/hooks/useNotes';
import { useHabits } from '@/hooks/useHabits';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, Target } from 'lucide-react';

const NotesFeed = () => {
  const { data: allNotes } = useNotes();
  const { data: habits } = useHabits();

  // Sort all notes by creation date
  const sortedNotes = allNotes?.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ) || [];

  const getHabitName = (habitId: string | null) => {
    if (!habitId) return null;
    return habits?.find(h => h.id === habitId)?.name;
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (sortedNotes.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <FileText className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-center">
            Nenhuma anotação ainda. Comece criando anotações nos seus hábitos ou anotações gerais.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sortedNotes.map((note) => {
        const habitName = getHabitName(note.habit_id);
        
        return (
          <Card key={note.id} className="glassmorphism border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {habitName ? (
                    <>
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{habitName}</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Anotação Geral</span>
                    </>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(note.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                </span>
              </div>
              <p className="text-sm break-word">
                {truncateContent(note.content)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NotesFeed;