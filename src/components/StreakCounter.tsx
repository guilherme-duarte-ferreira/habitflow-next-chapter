import { useEffect, useState } from 'react';
import { useHabitLogs } from '@/hooks/useHabitLogs';
import { differenceInSeconds, isAfter, subHours } from 'date-fns';

interface StreakCounterProps {
  habitId: string;
}

const StreakCounter = ({ habitId }: StreakCounterProps) => {
  const { data: logs } = useHabitLogs(habitId);
  const [timeDisplay, setTimeDisplay] = useState('---');

  useEffect(() => {
    if (!logs || logs.length === 0) {
      setTimeDisplay('---');
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const lastLog = new Date(logs[0].logged_at); // logs are ordered by logged_at desc
      
      // Check if streak is broken (more than 48 hours)
      const hoursSinceLastLog = differenceInSeconds(now, lastLog) / 3600;
      if (hoursSinceLastLog > 48) {
        setTimeDisplay('Sequência quebrada');
        return;
      }

      const secondsDiff = differenceInSeconds(now, lastLog);
      const days = Math.floor(secondsDiff / 86400);
      const hours = Math.floor((secondsDiff % 86400) / 3600);
      const minutes = Math.floor((secondsDiff % 3600) / 60);
      const seconds = secondsDiff % 60;

      if (days > 0) {
        setTimeDisplay(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (hours > 0) {
        setTimeDisplay(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeDisplay(`${minutes}m ${seconds}s`);
      } else {
        setTimeDisplay(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div className="streak-counter bg-accent/20 text-sm font-mono px-3 py-1 rounded-full text-center">
      {timeDisplay}
    </div>
  );
};

export default StreakCounter;