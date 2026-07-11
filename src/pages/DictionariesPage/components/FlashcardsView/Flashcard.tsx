import { cn } from '@/lib/utils';
import { useState, useImperativeHandle, forwardRef } from 'react';

export interface FlashcardRef {
  triggerScale: () => void;
}

interface FlashcardProps {
  sourceText: string;
  targetText: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard = forwardRef<FlashcardRef, FlashcardProps>(
  ({ isFlipped, onFlip, sourceText, targetText }, ref) => {
    const [isScaling, setIsScaling] = useState(false);

    useImperativeHandle(ref, () => ({
      triggerScale: () => {
        setIsScaling(true);
        // Возвращаем в исходное состояние через 150мс
        setTimeout(() => {
          setIsScaling(false);
        }, 100);
      },
    }));

    return (
      <div
        onPointerDown={onFlip}
        // Динамически подставляем scale-95 или scale-100
        className={cn("flex justify-center cursor-pointer items-center w-60 h-36 mx-auto my-auto font-bold border select-none rounded-md bg-input/40 transition-transform duration-200",
          isScaling ? 'scale-95' : 'scale-100'
        )}
      >
        {!isFlipped && <span>{sourceText}</span>}
        {isFlipped && <span>{targetText}</span>}
      </div>
    );
  }
);

export default Flashcard;
