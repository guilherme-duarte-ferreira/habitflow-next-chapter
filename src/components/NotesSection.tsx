import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Maximize2, Minimize2 } from 'lucide-react';
import { useNotes, useDeleteNote } from '@/hooks/useNotes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import NoteDialog from './NoteDialog';

interface NotesSectionProps {
  habitId?: string;
  title?: string;
}

const NotesSection = ({ habitId, title = "Anotações" }: NotesSectionProps) => {
  const { data: notes } = useNotes(habitId);
  const deleteNote = useDeleteNote();
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<{ id: string; content: string } | null>(null);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote.mutate(noteId);
  };

  return (
    <>
      <Card className="glassmorphism border-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddNote(true)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notes?.map((note) => {
              const isExpanded = expandedNote === note.id;
              const shouldTruncate = note.content.length > 100;
              
              return (
                <div key={note.id} className="p-3 bg-accent/20 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(note.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </span>
                    <div className="flex space-x-1">
                      {shouldTruncate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedNote(isExpanded ? null : note.id)}
                          className="h-6 w-6 p-0"
                        >
                          {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingNote({ id: note.id, content: note.content })}
                        className="h-6 w-6 p-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNote(note.id)}
                        className="h-6 w-6 p-0 text-destructive hover:bg-destructive/20"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm break-word whitespace-pre-wrap">
                    {isExpanded || !shouldTruncate ? note.content : truncateContent(note.content)}
                  </p>
                  {shouldTruncate && !isExpanded && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setExpandedNote(note.id)}
                      className="h-auto p-0 text-xs mt-1"
                    >
                      Ver mais...
                    </Button>
                  )}
                </div>
              );
            })}
            {notes?.length === 0 && (
              <p className="text-muted-foreground text-center py-4 text-sm">
                Nenhuma anotação ainda
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <NoteDialog
        open={showAddNote}
        onClose={() => setShowAddNote(false)}
        habitId={habitId}
      />

      <NoteDialog
        open={!!editingNote}
        onClose={() => setEditingNote(null)}
        habitId={habitId}
        editingNote={editingNote}
      />
    </>
  );
};

export default NotesSection;