import GroupHeading from './GroupHeading';
import GroupWrapper from './GroupWrapper';
import type { SettingsGroupProps } from "../../types/SettingsGroupProps";
import ShortcutProperty from '../Properties/ShortcutProperty';

export default ({ settings, changeSettingsProperty }: SettingsGroupProps) => {
  return (
    <GroupWrapper>
      <GroupHeading>Shortcuts</GroupHeading>

      <ShortcutProperty id='clear-shortcut-input' label='Clear input field shortcut' defaultValue={settings.clearShortcut}
        onChange={value => changeSettingsProperty('clearShortcut', value)} />
      <ShortcutProperty id='swap-langs-shortcut-input' label='Swap languages shortcut' defaultValue={settings.swapLangsShortcut}
        onChange={value => changeSettingsProperty('swapLangsShortcut', value)} />
      <ShortcutProperty id='apply-correction-shortcut-input' label='Apply correction shortcut' defaultValue={settings.applyCorrectionShortcut}
        onChange={value => changeSettingsProperty('applyCorrectionShortcut', value)} />

      <ShortcutProperty id='prev-flashcard-shortcut-input' label='Previous flashcard shortcut' defaultValue={settings.prevFlashcardShortcut}
        onChange={value => changeSettingsProperty('prevFlashcardShortcut', value)} />
      <ShortcutProperty id='next-flashcard-shortcut-input' label='Next flashcard shortcut' defaultValue={settings.nextFlashcardShortcut}
        onChange={value => changeSettingsProperty('nextFlashcardShortcut', value)} />
      <ShortcutProperty id='flip-flashcard-shortcut-input' label='Flip flashcard shortcut' defaultValue={settings.flipFlashcardShortcut}
        onChange={value => changeSettingsProperty('flipFlashcardShortcut', value)} />

    </GroupWrapper>
  )
}
