import { useState } from 'react';
import GroupHeading from './GroupHeading';
import GroupWrapper from './GroupWrapper';
import { AppSettingsSchema } from '@/app/types/AppSettings';
import type { SettingsGroupProps } from "../../types/SettingsGroupProps";
import TextProperty from "../Properties/TextProperty";
import SwitchProperty from '../Properties/SwitchProperty';
import SelectProperty from "../Properties/SelectProperty";


export default ({ settings, changeSettingsProperty }: SettingsGroupProps) => {
  const [currentIsProxyEnabled, setCurrentIsProxyEnabled] = useState(settings.isProxyEnabled);

  return (
    <GroupWrapper>
      <GroupHeading>Proxy</GroupHeading>
      <SwitchProperty id='proxy-switch' label='Use proxy'
        defaultValue={settings.isProxyEnabled}
        onChange={(value) => {
          setCurrentIsProxyEnabled(value);
          changeSettingsProperty('isProxyEnabled', value)
        }}
        hint='You need restart the app to apply proxy settings.' />

      {currentIsProxyEnabled &&
        <SelectProperty label="Proxy protocol"
          defaultValue={settings.proxyProtocol}
          selectItems={AppSettingsSchema.shape.proxyProtocol.unwrap().options.map(protocol => ({
            value: protocol,
            label: protocol.toUpperCase()
          }))}
          onChange={value => changeSettingsProperty('proxyProtocol', value)} />}

      {currentIsProxyEnabled &&
        <TextProperty id='proxy-host-input' label='Proxy host'
          defaultValue={settings.proxyHost}
          onChange={value => changeSettingsProperty('proxyHost', value)} />}

      {currentIsProxyEnabled &&
        <TextProperty id='proxy-port-input' label='Proxy port'
          defaultValue={settings.proxyPort}
          onChange={value => changeSettingsProperty('proxyPort', value)} />}

      {currentIsProxyEnabled &&
        <TextProperty id='proxy-user-input' label='Proxy user'
          defaultValue={settings.proxyUser}
          onChange={value => changeSettingsProperty('proxyUser', value)} />}

      {currentIsProxyEnabled &&
        <TextProperty id='proxy-password-input' label='Proxy password'
          defaultValue={settings.proxyPass} type='password'
          onChange={value => changeSettingsProperty('proxyPass', value)} />}
    </GroupWrapper>
  )
}
