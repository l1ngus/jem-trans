import { useMemo, useState } from "react";

interface FlashcardProps {
  sourceText: string;
  targetText: string;
}

const Flashcard = ({ sourceText, targetText }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const currentPair = useMemo(() => {
    setIsFlipped(false);
    return { sourceText, targetText };
  }, [sourceText, targetText]);

  return (
    <div
      onClick={() => setIsFlipped(prev => !prev)}
      className="flex justify-center cursor-pointer items-center w-60 h-36 mx-auto my-auto font-bold border select-none rounded-md bg-input/40 transition-transform duration-200 active:scale-95"
    >
      {!isFlipped && <span> {currentPair.sourceText}</span>}
      {isFlipped && <span>{currentPair.targetText}</span>}
    </div >
  )
}

export default Flashcard;
