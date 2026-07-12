import { useMemo } from 'react';
import useSettings from '@/app/hooks/useSettings';
import type { ModelProfile } from '@/app/types/ModelProfile';

export default (): ModelProfile | null => {
  const { settings } = useSettings();
  const llmProfile = useMemo(() => {
    return settings.llmProfiles.find(p => p.id === settings.activeLlmProfileId) ?? null;
  }, [settings.activeLlmProfileId, settings.llmProfiles]);

  return llmProfile;
}
