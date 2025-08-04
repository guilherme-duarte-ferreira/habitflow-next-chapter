import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateHabitLog, useHabitLogs, useDeleteHabitLog } from '@/hooks/useHabitLogs';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';

interface AddLogDialogProps {
  habitId: string;
  open: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

const AddLogDialog = ({ habitId, open, onClose, selectedDate }: AddLogDialogProps) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const createLog = useCreateHabitLog();
  const deleteLog = useDeleteHabitLog();
  const { data: logs } = useHabitLogs(habitId);

  useEffect(() => {
    if (open) {
      const now = selectedDate || new Date();
      setDate(format(now, 'yyyy-MM-dd'));
      setTime(format(now, 'HH:mm'));
    }
  }, [open, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time) {
      const loggedAt = new Date(`${date}T${time}:00`).toISOString();
      createLog.mutate(
        { habitId, loggedAt },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const selectedDateLogs = logs?.filter(log => {
    const logDate = format(new Date(log.logged_at), 'yyyy-MM-dd');
    return logDate === date;
  }) || [];

  const handleDeleteLog = (logId: string) => {
    deleteLog.mutate(logId);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Atividade</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Horário</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {selectedDateLogs.length > 0 && (
            <div className="space-y-2">
              <Label>Outros registros neste dia:</Label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {selectedDateLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-2 bg-accent/20 rounded text-sm">
                    <span>
                      {format(new Date(log.logged_at), 'HH:mm', { locale: ptBR })}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteLog(log.id)}
                      className="h-6 w-6 p-0 text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createLog.isPending}>
              {createLog.isPending ? 'Registrando...' : 'Registrar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLogDialog;