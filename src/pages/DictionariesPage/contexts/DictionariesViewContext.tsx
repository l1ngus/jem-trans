import { useMemo, createContext, type PropsWithChildren, useState } from 'react';

export type DictView = 'list' | 'editor' | 'flashcards';

export interface DictionariesViewContextValue {
  currentView: DictView;
  dictId: string | null;
  openListView: () => void;
  openEditorView: (dictId: string) => void;
  openFlashcardsView: (dictId: string) => void;
}

export const DictionariesContext = createContext<DictionariesViewContextValue | null>(null);

export const DictionariesViewProvider = ({ children }: PropsWithChildren) => {
  const [currentView, setCurrentView] = useState<DictView>('list');
  const [dictId, setDictId] = useState<string | null>(null)

  const openEditorView = (openingDictId: string) => {
    setCurrentView('editor');
    setDictId(openingDictId);
  }

  const openListView = () => {
    setCurrentView('list');
    setDictId(null);
  }

  const openFlashcardsView = (learningDictId: string) => {
    setCurrentView('flashcards');
    setDictId(learningDictId);
  }

  const contextValue = useMemo<DictionariesViewContextValue>(() => ({
    currentView,
    dictId,
    openListView,
    openEditorView,
    openFlashcardsView
  }), [currentView])

  return (
    <DictionariesContext.Provider value={contextValue}>
      {children}
    </DictionariesContext.Provider>
  )
}
