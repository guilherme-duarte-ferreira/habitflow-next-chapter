import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit2, Trash2, Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useHabits, useDeleteHabit } from '@/hooks/useHabits';
import { useHabitLogs, useDeleteHabitLog } from '@/hooks/useHabitLogs';
import { useNotes } from '@/hooks/useNotes';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, getYear, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import EditHabitDialog from '@/components/EditHabitDialog';
import AddLogDialog from '@/components/AddLogDialog';
import StreakCounter from '@/components/StreakCounter';
import NotesSection from '@/components/NotesSection';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const HabitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
  const [editingHabit, setEditingHabit] = useState<{ id: string; name: string } | null>(null);
  const [showAddLog, setShowAddLog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [deletingHabit, setDeletingHabit] = useState(false);

  const { data: habits } = useHabits();
  const { data: logs } = useHabitLogs(id);
  const deleteHabit = useDeleteHabit();
  const deleteLog = useDeleteHabitLog();

  const habit = habits?.find(h => h.id === id);

  if (!habit) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">Hábito não encontrado</h2>
        <Link to="/">
          <Button variant="outline">Voltar ao Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowAddLog(true);
  };

  const hasLogOnDay = (day: Date) => {
    return logs?.some(log => isSameDay(new Date(log.logged_at), day));
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}
          {days.map((day) => {
            const hasLog = hasLogOnDay(day);
            const isCurrentDay = isToday(day);
            
            return (
              <Button
                key={day.toISOString()}
                variant={hasLog ? "default" : "outline"}
                className={cn(
                  "h-10 w-10 p-0 text-sm",
                  isCurrentDay && "ring-2 ring-primary",
                  hasLog && "bg-primary text-primary-foreground"
                )}
                onClick={() => handleDateClick(day)}
              >
                {format(day, 'd')}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const year = getYear(currentDate);
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

    return (
      <div className="grid grid-cols-3 gap-4">
        {months.map((month) => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
          const monthLogs = monthDays.filter(hasLogOnDay).length;
          
          return (
            <Card key={month.toISOString()} className="cursor-pointer hover:bg-accent" onClick={() => {
              setCurrentDate(month);
              setViewMode('month');
            }}>
              <CardContent className="p-4 text-center">
                <h4 className="font-medium mb-2">
                  {format(month, 'MMMM', { locale: ptBR })}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {monthLogs} registro{monthLogs !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const recentLogs = logs?.slice(0, 10) || [];

  const handleDeleteHabit = () => {
    deleteHabit.mutate(habit.id, {
      onSuccess: () => {
        // Navigate back to dashboard after deletion
        window.location.href = '/';
      }
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-xl font-semibold flex items-center">
              <span>{habit.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingHabit({ id: habit.id, name: habit.name })}
                className="ml-2 h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <StreakCounter habitId={habit.id} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeletingHabit(true)}
              className="text-destructive hover:bg-destructive/20"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glassmorphism border-border">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (viewMode === 'month') {
                          setCurrentDate(subMonths(currentDate, 1));
                        } else {
                          setCurrentDate(new Date(getYear(currentDate) - 1, 0, 1));
                        }
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="font-medium text-lg w-36 text-center">
                      {viewMode === 'month' 
                        ? format(currentDate, 'MMMM yyyy', { locale: ptBR })
                        : format(currentDate, 'yyyy')
                      }
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (viewMode === 'month') {
                          setCurrentDate(addMonths(currentDate, 1));
                        } else {
                          setCurrentDate(new Date(getYear(currentDate) + 1, 0, 1));
                        }
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('month')}
                    >
                      Mês
                    </Button>
                    <Button
                      variant={viewMode === 'year' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('year')}
                    >
                      Ano
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === 'month' ? renderMonthView() : renderYearView()}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="glassmorphism border-border">
              <CardHeader>
                <CardTitle className="text-lg">Registros Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-2 bg-accent/20 rounded text-sm">
                      <span>
                        {format(new Date(log.logged_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteLog.mutate(log.id)}
                        className="h-6 w-6 p-0 text-destructive hover:bg-destructive/20"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {recentLogs.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum registro ainda
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <NotesSection habitId={habit.id} />
          </div>
        </div>
      </div>

      <EditHabitDialog
        habit={editingHabit}
        onClose={() => setEditingHabit(null)}
      />

      <AddLogDialog
        habitId={habit.id}
        open={showAddLog}
        onClose={() => setShowAddLog(false)}
        selectedDate={selectedDate || undefined}
      />

      <AlertDialog open={deletingHabit} onOpenChange={setDeletingHabit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este hábito? Esta ação não pode ser desfeita e todos os registros e anotações relacionados serão perdidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeletingHabit(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteHabit}
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

export default HabitDetail;