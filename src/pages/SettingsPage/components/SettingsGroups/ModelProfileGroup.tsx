import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ModelProfile } from '@/app/types/ModelProfile';
import type { SettingsGroupProps } from "../../types/SettingsGroupProps";
import GroupWrapper from './GroupWrapper';
import GroupHeading from './GroupHeading';
import TextProperty from "../Properties/TextProperty";
import SelectProperty from "../Properties/SelectProperty";
import SwitchProperty from '../Properties/SwitchProperty';
import { DEFAULT_AI_SERVICE, AI_SERVICE_KEYS, AI_SERVICES } from '@/app/consts/aiServices';

export default ({ settings, changeSettingsProperty }: SettingsGroupProps) => {
  const [activeProfileId, setActiveProfileId] = useState(settings.activeLlmProfileId);
  const [profiles, setProfiles] = useState(settings.llmProfiles);
  const [currentProfile, setCurrentProfile] = useState<ModelProfile | null>(() =>
    settings.llmProfiles.find(p => p.id === settings.activeLlmProfileId) ?? null
  );

  const handleActiveProfileChange = (profileId: string) => {
    setActiveProfileId(profileId);
    const found = profiles.find(p => p.id === profileId) ?? null;
    setCurrentProfile(found);
    changeSettingsProperty("activeLlmProfileId", profileId);
  }

  const handleCreateNewProfile = () => {
    const newProfile: ModelProfile = {
      id: crypto.randomUUID(),
      name: 'New profile',
      aiService: DEFAULT_AI_SERVICE,
      model: '',
      serviceUrl: '',
      apiKey: '',
      isProxyEnabled: false
    }
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    setActiveProfileId(newProfile.id);
    setCurrentProfile(newProfile);
    changeSettingsProperty("llmProfiles", updated);
    changeSettingsProperty("activeLlmProfileId", newProfile.id);
  }

  const handleDeleteActiveProfile = () => {
    const updated = profiles.filter(p => p.id !== activeProfileId);
    setCurrentProfile(null);
    setProfiles(updated);
    changeSettingsProperty('llmProfiles', updated);
  }

  const handleProfileFieldChange = <K extends keyof ModelProfile>(field: K, value: ModelProfile[K]) => {
    if (!currentProfile) return;
    const updatedProfile = { ...currentProfile, [field]: value } as ModelProfile;
    const updatedProfiles = profiles.map(p => (p.id === updatedProfile.id ? updatedProfile : p));
    setCurrentProfile(updatedProfile);
    setProfiles(updatedProfiles);
    changeSettingsProperty("llmProfiles", updatedProfiles);
  };

  const isProfileIdValid = profiles.some(p => p.id === activeProfileId);

  return (
    <GroupWrapper>
      <GroupHeading>Model profile</GroupHeading>
      <div className="flex items-end gap-2">
        <SelectProperty label='Model'
          value={isProfileIdValid
            ? activeProfileId
            : ""}
          selectItems={[
            ...profiles.map(p => ({
              label: p.name,
              value: p.id
            }))]}
          onChange={handleActiveProfileChange}
          placeholder='Select an LLM profile.' />
        <Button variant='outline' onClick={handleCreateNewProfile}>Add</Button>
        <Button disabled={!isProfileIdValid}
          className='border-destructive hover:bg-destructive'
          variant='outline' onClick={handleDeleteActiveProfile}
        >Del</Button>
      </div>
      {isProfileIdValid &&
        <TextProperty id='profile-name-input' label='Profile name'
          value={currentProfile?.name ?? ""}
          onChange={val => handleProfileFieldChange('name', val)} />}
      {isProfileIdValid &&
        <SelectProperty label="AI service"
          value={currentProfile?.aiService ?? DEFAULT_AI_SERVICE}
          selectItems={AI_SERVICE_KEYS.map(service => ({
            label: AI_SERVICES[service].label,
            value: service
          }))}
          onChange={val => handleProfileFieldChange('aiService', val)} />}

      {isProfileIdValid &&
        <TextProperty id='profile-model-input' label='Model'
          value={currentProfile?.model ?? ""}
          onChange={val => handleProfileFieldChange('model', val)} />}
      {(isProfileIdValid && currentProfile?.aiService === 'openaimanual') &&
        <TextProperty id='profile-service-url-input' label='AI service URL'
          value={currentProfile?.serviceUrl ?? ""}
          onChange={val => handleProfileFieldChange('serviceUrl', val)} />}
      {isProfileIdValid &&
        <TextProperty id='profile-service-api-key-input' label='API key'
          value={currentProfile?.apiKey ?? ""}
          onChange={val => handleProfileFieldChange('apiKey', val)}
          type='password' />}
      {isProfileIdValid &&
        <SwitchProperty id='profile-proxy-switch' label='Use proxy for this profile'
          checked={currentProfile?.isProxyEnabled ?? false}
          onChange={value => handleProfileFieldChange('isProxyEnabled', value)} />}
    </GroupWrapper>
  )
}
