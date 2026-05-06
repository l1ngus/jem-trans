import { commands } from '@/bindings';
import { AppSettingsSchema } from '@/app/types/AppSettings';
import GroupHeading from './GroupHeading';
import GroupWrapper from './GroupWrapper';
// import SwitchProperty from '../Properties/SwitchProperty';
// import SliderProperty from "../Properties/SliderProperty";
import SelectProperty from "../Properties/SelectProperty"
import type { SettingsGroupProps } from "../../types/SettingsGroupProps";
import { useEffect, useState } from 'react';

export default function ({ settings, changeSettingsProperty }: SettingsGroupProps) {
  const [voices, setVoices] = useState<string[]>([]);

  useEffect(() => {
    commands.getVoices()
      .then(result => {
        if (result.status === 'error') {
          console.error(`Failed to load voices, error: ${result.error}`);
          return;
        }
        const data = result.data.filter(voice => voice.includes("Multilingual"));
        setVoices(data);
        console.log("Voices loaded");
      })
  }, [])

  return (
    <GroupWrapper>
      <GroupHeading>General</GroupHeading>
      <SelectProperty label='App theme'
        defaultValue={settings.theme}
        selectItems={AppSettingsSchema.shape.theme.unwrap().options.map(theme => ({
          label: theme,
          value: theme
        }))}
        onChange={value => changeSettingsProperty('theme', value)} />
      <SelectProperty label='Voice'
        defaultValue={settings.voice}
        selectItems={voices.map(voice => ({
          value: voice,
          label: voice
        }))}
        onChange={value => changeSettingsProperty('voice', value)}
        placeholder='Select voice' />
    </GroupWrapper>
  )
}
