import { useMemo, useCallback, useRef, useState, createContext, type PropsWithChildren } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { LangPair } from '@/app/types/Langs';
import { DETECT_AND_SWAP_QUERY_KEY } from '../hooks/useDetectAndSwap';
import useTranslateQuery, { type UseTranslateQueryResult } from '../hooks/useTranslateQuery';
import { useDebouncedCallback } from '@/app/hooks/useDebouncedCallback';
import useSettings from '@/app/hooks/useSettings';
import useUserMeta from '@/app/hooks/useUserMeta';

type UpdateLangPairFn = (value: Partial<LangPair>) => void;
type GetSourceTextFn = () => string;
type UpdateSourceTextFn = (value: string) => void;

export interface TranslationContextValue {
  translationResult: UseTranslateQueryResult;
  langPair: LangPair;
  translateCurrent: () => void;
  updateLangPair: UpdateLangPairFn;
  getSourceText: GetSourceTextFn;
  updateSourceText: UpdateSourceTextFn;
  swapLangs: () => void;
}

export const TranslationContext = createContext<TranslationContextValue | null>(null);

export const TranslationProvider = ({ children }: PropsWithChildren) => {
  const { settings } = useSettings();
  const { getUserMeta, setUserMeta } = useUserMeta();
  const queryClient = useQueryClient();
  const [langPair, setLangPair] = useState<LangPair>(getUserMeta('lastLangPair'));
  const sourceTextRef = useRef<string>('');
  const [textForQuery, setTextForQuery] = useState('');
  const translationResult = useTranslateQuery({ term: textForQuery, sourceLang: langPair.source, targetLang: langPair.target });

  const [setTextForQueryDebounced, preventChangingTextForQuery]
    = useDebouncedCallback((value: string) => setTextForQuery(value), settings.autoTranslateDelay);

  const updateLangPair: UpdateLangPairFn = useCallback((value) => {
    queryClient.cancelQueries({ queryKey: DETECT_AND_SWAP_QUERY_KEY });
    setLangPair(prev => {
      const newValue = { ...prev, ...value };
      setUserMeta('lastLangPair', newValue);
      return newValue;
    });
  }, [])

  const getSourceText: GetSourceTextFn = useCallback(() => sourceTextRef.current, []);
  const updateSourceText: UpdateSourceTextFn = useCallback((value) => {
    const trimmedValue = value.trim();
    sourceTextRef.current = trimmedValue;
    if (settings.isAutoTranslateEnabled)
      if (trimmedValue)
        setTextForQueryDebounced(trimmedValue);
      else {
        preventChangingTextForQuery();
        setTextForQuery('');
      }
  }, [settings]);

  const swapLangs = useCallback(() => {
    if (translationResult.translation) {
      sourceTextRef.current = translationResult.translation;
      setTextForQuery(translationResult.translation);
    }
    setLangPair(prev => {
      if (prev.source === 'auto') return prev;
      return { source: prev.target, target: prev.source };
    });
  }, [])

  const translateCurrent = useCallback(() => setTextForQuery(sourceTextRef.current), []);

  const contextValue = useMemo<TranslationContextValue>(() => ({
    translationResult,
    langPair,
    translateCurrent,
    updateLangPair,
    getSourceText,
    updateSourceText,
    swapLangs
  }), [translationResult, langPair, translateCurrent, updateLangPair, getSourceText, swapLangs])

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  )
}
