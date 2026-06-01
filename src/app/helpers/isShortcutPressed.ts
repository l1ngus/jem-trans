import formatKeyboardCode from "./formatKeyboardCode";

export default (e: React.KeyboardEvent, shortcut: string[]) => {
  if (!shortcut || shortcut.length === 0) return false;

  // Проверяем, требует ли шорткат зажатых модификаторов
  const requiresCtrl = shortcut.includes("Ctrl");
  const requiresCmd = shortcut.includes("Cmd");
  const requiresAlt = shortcut.includes("Alt");
  const requiresShift = shortcut.includes("Shift");

  // Строгая проверка (если в шорткате нет Shift, а юзер его нажал — шорткат не сработает)
  if (e.ctrlKey !== requiresCtrl) return false;
  if (e.metaKey !== requiresCmd) return false;
  if (e.altKey !== requiresAlt) return false;
  if (e.shiftKey !== requiresShift) return false;

  // Ищем основную клавишу в массиве (которая не является модификатором)
  const MODIFIERS = ["Ctrl", "Cmd", "Alt", "Shift"];
  const mainKey = shortcut.find(key => !MODIFIERS.includes(key));

  // Если основная клавиша есть, проверяем, совпадает ли она с текущим e.code
  if (mainKey) {
    return formatKeyboardCode(e.code) === mainKey;
  }

  return true; // Если шорткат состоит только из модификаторов (редко, но бывает)
};
