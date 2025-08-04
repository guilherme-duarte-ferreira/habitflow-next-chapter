import { useHabitLogs } from '@/hooks/useHabitLogs';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface MiniCalendarProps {
  habitId: string;
}

const MiniCalendar = ({ habitId }: MiniCalendarProps) => {
  const { data: logs } = useHabitLogs(habitId);
  const now = new Date();
  
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const hasLogOnDay = (day: Date) => {
    return logs?.some(log => isSameDay(new Date(log.logged_at), day));
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">
        {format(now, 'MMMM yyyy', { locale: ptBR })}
      </h4>
      <div className="grid grid-cols-7 gap-1">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day) => (
          <div key={day} className="text-xs text-center text-muted-foreground p-1">
            {day}
          </div>
        ))}
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="p-1" />
        ))}
        {days.map((day) => {
          const hasLog = hasLogOnDay(day);
          const isCurrentDay = isToday(day);
          
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "text-xs p-1 text-center rounded",
                hasLog && "bg-primary text-primary-foreground",
                !hasLog && "text-muted-foreground",
                isCurrentDay && "ring-2 ring-primary"
              )}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;