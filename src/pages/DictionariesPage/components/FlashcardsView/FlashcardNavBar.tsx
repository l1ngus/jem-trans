import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlashcardNavBarProps {
  currentPairInd: number;
  pairsAmount: number;
  onPrev: () => void;
  onNext: () => void;
}

const FlashcardNavBar = ({ currentPairInd, pairsAmount, onPrev, onNext }: FlashcardNavBarProps) => {
  return (
    <div className="mx-auto w-fit flex items-center gap-2">
      <Button disabled={currentPairInd <= 0} onClick={onPrev} className="cursor-pointer" variant="outline" size="icon-sm"><ArrowBigLeft /></Button>
      <span className="font-bold select-none">{currentPairInd + 1}/{pairsAmount}</span>
      <Button disabled={currentPairInd + 1 >= pairsAmount} onClick={onNext} className="cursor-pointer" variant="outline" size="icon-sm"><ArrowBigRight /></Button>
    </div>
  )
}

export default FlashcardNavBar;
