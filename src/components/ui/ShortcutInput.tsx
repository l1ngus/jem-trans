import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import formatKeyboardCode from "@/app/helpers/formatKeyboardCode";

export interface ShortcutInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}


// Список кодов клавиш-модификаторов (левые и правые)
const MODIFIER_CODES = [
  "ControlLeft", "ControlRight",
  "ShiftLeft", "ShiftRight",
  "AltLeft", "AltRight",
  "MetaLeft", "MetaRight", // Cmd на Mac / Win на Windows
];

export const ShortcutInput: React.FC<ShortcutInputProps> = ({
  value,
  onChange,
  placeholder = "Нажмите для записи...",
  className,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [liveKeys, setLiveKeys] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isRecording) return;

      e.preventDefault();
      e.stopPropagation();

      // Отмена по Escape
      if (e.code === "Escape") {
        setIsRecording(false);
        setLiveKeys([]);
        containerRef.current?.blur();
        return;
      }

      // Очистка по Backspace
      if (e.code === "Backspace") {
        onChange([]);
        setIsRecording(false);
        setLiveKeys([]);
        containerRef.current?.blur();
        return;
      }

      // Собираем модификаторы (полагаемся на флаги события, это надежнее)
      const keys: string[] = [];
      if (e.ctrlKey) keys.push("Ctrl");
      if (e.metaKey) keys.push("Cmd");
      if (e.altKey) keys.push("Alt");
      if (e.shiftKey) keys.push("Shift");

      const isModifierOnly = MODIFIER_CODES.includes(e.code);

      if (isModifierOnly) {
        // Если зажали только модификатор, показываем процесс в live-режиме
        setLiveKeys(keys);
      } else {
        // Добавляем саму клавишу, конвертируя её код
        keys.push(formatKeyboardCode(e.code));
        onChange(keys);
        setIsRecording(false);
        setLiveKeys([]);
        containerRef.current?.blur();
      }
    },
    [isRecording, onChange]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!isRecording) return;
      e.preventDefault();

      // Обновляем live-режим, если пользователь отпустил один из модификаторов
      const keys: string[] = [];
      if (e.ctrlKey) keys.push("Ctrl");
      if (e.metaKey) keys.push("Cmd");
      if (e.altKey) keys.push("Alt");
      if (e.shiftKey) keys.push("Shift");

      setLiveKeys(keys);
    },
    [isRecording]
  );

  useEffect(() => {
    if (isRecording) {
      window.addEventListener("keydown", handleKeyDown, { capture: true });
      window.addEventListener("keyup", handleKeyUp, { capture: true });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keyup", handleKeyUp, { capture: true });
    };
  }, [isRecording, handleKeyDown, handleKeyUp]);

  const displayKeys = isRecording && liveKeys.length > 0 ? liveKeys : value;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onClick={() => setIsRecording(true)}
      onFocus={() => setIsRecording(true)}
      onBlur={() => {
        setIsRecording(false);
        setLiveKeys([]);
      }}
      className={cn(
        "flex h-10 w-full cursor-pointer items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isRecording ? "ring-2 ring-ring ring-offset-2 border-primary" : "",
        className
      )}
    >
      {displayKeys.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {displayKeys.map((key, index) => (
            <kbd
              key={index}
              className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
            >
              {key}
            </kbd>
          ))}
        </div>
      ) : (
        <span className="text-muted-foreground">
          {isRecording ? "Слушаю клавиши..." : placeholder}
        </span>
      )}
    </div>
  );
};
