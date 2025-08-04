import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, Upload, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useHabits } from '@/hooks/useHabits';
import { useHabitLogs } from '@/hooks/useHabitLogs';
import { useNotes } from '@/hooks/useNotes';
import { supabase } from '@/lib/supabase';
import { BackupData } from '@/types';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Settings = () => {
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  
  const { data: habits } = useHabits();
  const { data: allLogs } = useHabitLogs();
  const { data: allNotes } = useNotes();

  const handleBackup = async () => {
    try {
      const backupData: BackupData = {
        habits: habits || [],
        logs: allLogs || [],
        notes: allNotes || [],
        exported_at: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: 'application/json',
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `habitflow-backup-${format(new Date(), 'yyyy-MM-dd-HHmm')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Backup criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      toast.error('Erro ao criar backup');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const backupData: BackupData = JSON.parse(text);
      
      // Validate backup data structure
      if (!backupData.habits || !backupData.logs || !backupData.notes) {
        throw new Error('Formato de backup inválido');
      }
      
      setShowRestoreDialog(true);
      
      // Store backup data temporarily for restoration
      (window as any).pendingBackupData = backupData;
    } catch (error) {
      console.error('Erro ao ler arquivo:', error);
      toast.error('Arquivo de backup inválido');
    }
    
    // Reset file input
    event.target.value = '';
  };

  const handleRestore = async () => {
    const backupData = (window as any).pendingBackupData as BackupData;
    if (!backupData) return;
    
    setIsRestoring(true);
    
    try {
      // Clear existing data first
      await supabase.from('habit_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('notes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('habits').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Restore habits
      if (backupData.habits.length > 0) {
        const { error: habitsError } = await supabase
          .from('habits')
          .insert(backupData.habits.map(h => ({
            id: h.id,
            name: h.name,
            created_at: h.created_at,
            updated_at: h.updated_at,
          })));
        
        if (habitsError) throw habitsError;
      }
      
      // Restore logs
      if (backupData.logs.length > 0) {
        const { error: logsError } = await supabase
          .from('habit_logs')
          .insert(backupData.logs.map(l => ({
            id: l.id,
            habit_id: l.habit_id,
            logged_at: l.logged_at,
            created_at: l.created_at,
          })));
        
        if (logsError) throw logsError;
      }
      
      // Restore notes
      if (backupData.notes.length > 0) {
        const { error: notesError } = await supabase
          .from('notes')
          .insert(backupData.notes.map(n => ({
            id: n.id,
            content: n.content,
            habit_id: n.habit_id,
            created_at: n.created_at,
            updated_at: n.updated_at,
          })));
        
        if (notesError) throw notesError;
      }
      
      toast.success('Backup restaurado com sucesso!');
      
      // Refresh the page to reload all data
      window.location.reload();
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      toast.error('Erro ao restaurar backup');
    } finally {
      setIsRestoring(false);
      setShowRestoreDialog(false);
      delete (window as any).pendingBackupData;
    }
  };

  const handleClearData = async () => {
    setIsClearing(true);
    
    try {
      // Delete all data in the correct order (foreign key constraints)
      await supabase.from('habit_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('notes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('habits').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      toast.success('Todos os dados foram limpos!');
      
      // Refresh the page to reload empty state
      window.location.reload();
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      toast.error('Erro ao limpar dados');
    } finally {
      setIsClearing(false);
      setShowClearDialog(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-xl font-semibold">Configurações</h2>
        </div>

        <div className="space-y-6">
          <Card className="glassmorphism border-border">
            <CardHeader>
              <CardTitle>Gerenciamento de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Fazer Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Exporta todos os seus hábitos, registros e anotações em um arquivo JSON.
                </p>
                <Button onClick={handleBackup} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Fazer Backup
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="restore-file">Restaurar Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Importa dados de um arquivo de backup. Isso substituirá todos os dados atuais.
                </p>
                <Input
                  id="restore-file"
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-border border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-destructive">Limpar Todos os Dados</Label>
                <p className="text-sm text-muted-foreground">
                  Remove permanentemente todos os hábitos, registros e anotações. Esta ação não pode ser desfeita.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={() => setShowClearDialog(true)}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Todos os Dados
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar limpeza de dados</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja limpar todos os dados? Esta ação removerá permanentemente:
              <br />• Todos os hábitos
              <br />• Todos os registros de atividade
              <br />• Todas as anotações
              <br /><br />
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowClearDialog(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleClearData}
              disabled={isClearing}
            >
              {isClearing ? 'Limpando...' : 'Limpar Dados'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar restauração</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja restaurar este backup? Esta ação substituirá todos os dados atuais pelos dados do arquivo de backup.
              <br /><br />
              Dados atuais serão perdidos permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowRestoreDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleRestore}
              disabled={isRestoring}
            >
              {isRestoring ? 'Restaurando...' : 'Restaurar Backup'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Settings;