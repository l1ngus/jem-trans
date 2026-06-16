import { useState, type ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ImportPairsDialogProps {
  children: ReactNode
}

const ImportPairsDialog = ({ children }: ImportPairsDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent aria-description={undefined} className="p-2 flex gap-1 flex-row max-h-80 max-w-120 sm:max-w-120 h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)]">
        <Textarea className="flex-1" />
        <div className="flex gap-2 flex-col flex-1 mt-2 ml-2">
          <DialogTitle className="mb-1">Import pairs</DialogTitle>
          <div className="grid w-full max-w-xs items-center gap-1.5">
            <Label htmlFor="separator-select">Separator</Label>
            <Select defaultValue="-">
              <SelectTrigger size="sm" id="separator-select">
                <SelectValue placeholder="Separator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-">Dash (-)</SelectItem>
                <SelectItem value=":">Colon (:)</SelectItem>
                <SelectItem value="::">Double colon (::)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImportPairsDialog;
