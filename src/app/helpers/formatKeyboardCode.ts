
export default (code: string) => {
  if (code.startsWith("Key")) return code.replace("Key", "");
  if (code.startsWith("Digit")) return code.replace("Digit", "");
  if (code.startsWith("Numpad")) return code.replace("Numpad", "Num ");
  if (code.startsWith("Arrow")) return code.replace("Arrow", "");

  const symbolMap: Record<string, string> = {
    Minus: "-", Equal: "=", BracketLeft: "[", BracketRight: "]",
    Semicolon: ";", Quote: "'", Backquote: "`", Backslash: "\\",
    Comma: ",", Period: ".", Slash: "/", Space: "Space",
    Enter: "Enter", Tab: "Tab",
  };

  return symbolMap[code] || code;
};
