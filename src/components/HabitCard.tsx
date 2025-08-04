import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { Habit } from '@/types';
import { useHabitLogs } from '@/hooks/useHabitLogs';
import { useState } from 'react';
import AddLogDialog from './AddLogDialog';
import MiniCalendar from './MiniCalendar';
import StreakCounter from './StreakCounter';

interface HabitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: HabitCardProps) => {
  const { data: logs } = useHabitLogs(habit.id);
  const [showAddLog, setShowAddLog] = useState(false);

  const totalLogs = logs?.length || 0;

  return (
    <>
      <Card className="habit-card hover:shadow-lg transition-all duration-200 glassmorphism border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium truncate flex-1 mr-2">
            {habit.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddLog(true)}
            className="h-8 w-8 p-0 hover:bg-primary/20"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total de registros:</span>
            <span className="font-semibold">{totalLogs}</span>
          </div>
          
          <StreakCounter habitId={habit.id} />
          
          <MiniCalendar habitId={habit.id} />
          
          <Link to={`/habit/${habit.id}`}>
            <Button variant="outline" className="w-full mt-4">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          </Link>
        </CardContent>
      </Card>

      <AddLogDialog
        habitId={habit.id}
        open={showAddLog}
        onClose={() => setShowAddLog(false)}
      />
    </>
  );
};

export default HabitCard;