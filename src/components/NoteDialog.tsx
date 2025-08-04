import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useCreateNote, useUpdateNote } from '@/hooks/useNotes';
import { cn } from '@/lib/utils';

interface NoteDialogProps {
  open: boolean;
  onClose: () => void;
  habitId?: string;
  editingNote?: { id: string; content: string } | null;
}

const NoteDialog = ({ open, onClose, habitId, editingNote }: NoteDialogProps) => {
  const [content, setContent] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  useEffect(() => {
    if (open) {
      setContent(editingNote?.content || '');
      setIsMaximized(false);
    }
  }, [open, editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      if (editingNote) {
        updateNote.mutate(
          { id: editingNote.id, content: content.trim() },
          {
            onSuccess: () => {
              onClose();
            },
          }
        );
      } else {
        createNote.mutate(
          { content: content.trim(), habitId },
          {
            onSuccess: () => {
              onClose();
            },
          }
        );
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "transition-all duration-300",
          isMaximized && "fixed inset-0 max-w-none max-h-none h-screen w-screen m-0 rounded-none"
        )}
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>
              {editingNote ? 'Editar Anotação' : 'Nova Anotação'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMaximized(!isMaximized)}
              className="h-8 w-8 p-0"
            >
              {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className={cn("flex flex-col", isMaximized && "flex-1")}>
          <div className={cn("space-y-4", isMaximized && "flex-1 flex flex-col")}>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva sua anotação aqui..."
              className={cn(
                "min-h-[120px] resize-none",
                isMaximized && "flex-1 min-h-0"
              )}
              autoFocus
            />
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={createNote.isPending || updateNote.isPending}
            >
              {createNote.isPending || updateNote.isPending 
                ? 'Salvando...' 
                : editingNote ? 'Atualizar' : 'Salvar'
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;