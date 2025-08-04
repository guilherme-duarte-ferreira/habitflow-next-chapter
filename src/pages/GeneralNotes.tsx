import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import NotesSection from '@/components/NotesSection';

const GeneralNotes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-xl font-semibold">Anotações Gerais</h2>
      </div>

      <NotesSection habitId="general" title="Anotações Gerais" />
    </div>
  );
};

export default GeneralNotes;