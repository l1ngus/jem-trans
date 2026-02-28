import { useRef, useEffect, type ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ChevronsRightIcon, MicIcon, Volume2 } from 'lucide-react';
import useTranslation from '../hooks/useTranslation';
import useSettings from '@/app/hooks/useSettings';
import useDetectAndSwap from '../hooks/useDetectAndSwap';
import useTextToSpeech from '../hooks/useTextToSpeech';

export default function () {
  const { settings } = useSettings();
  const detectAndSwapLangs = useDetectAndSwap();
  const { translateCurrent, updateSourceText, langPair, sourceText } = useTranslation();
  const { speak } = useTextToSpeech();
  const inputTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      inputTextareaRef.current?.focus();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const sourceValue = e.target.value;
    updateSourceText(sourceValue);
    detectAndSwapLangs(sourceValue, langPair);
  }

  const handleSpeak = () => {
    speak(sourceText);
  }

  return (
    <div className="relative">
      <Textarea ref={inputTextareaRef} value={sourceText} className='flex-1 resize-none min-h-40' onChange={handleChange} />
      <div className="absolute bottom-1.5 right-1.5 flex items-center gap-2">
        <div className='flex gap-1.5 p-0.5'>
          <Volume2 onClick={handleSpeak} className='cursor-pointer' />
          <MicIcon className='cursor-pointer' />
          {!settings.isAutoLanguageSwitchEnabled &&
            <ChevronsRightIcon onClick={translateCurrent} className='cursor-pointer' />
          }
        </div>
      </div>
    </div>
  )
}
