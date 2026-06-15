import { SquarePen, StickyNotes } from 'lucide-react';
import { DictionaryMeta } from "@/app/types/Dictionary"
import { useDictionariesView } from "../../hooks/useDictionariesView";

interface DictionaryCardProps {
  dictMeta: DictionaryMeta;
}

export default ({ dictMeta }: DictionaryCardProps) => {
  const { openEditorView } = useDictionariesView();

  return (
    <div className="flex justify-between py-1.5 px-3 border rounded-md items-center">
      <b>{dictMeta.name}</b>
      <div className="flex items-center gap-3">
        <SquarePen onClick={() => openEditorView(dictMeta.id)} className='cursor-pointer hover:scale-110 transition-transform duration-200' />
        <StickyNotes className='cursor-pointer hover:scale-110 transition-transform duration-200' />
      </div>
    </div>
  )
}
