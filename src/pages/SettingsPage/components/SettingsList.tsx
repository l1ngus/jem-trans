import { useEffect } from "react";
import useSettings from "@/app/hooks/useSettings";
import ModelProfileGroup from "./SettingsGroups/ModelProfileGroup";
import GeneralGroup from "./SettingsGroups/GeneralGroup";
import ProxyGroup from "./SettingsGroups/ProxyGroup";
import { Separator } from "@/components/ui/separator";

export default function () {
  const { settings, changeSettingsProperty, restoreSettings } = useSettings();
  useEffect(() => restoreSettings(), []);

  return (
    <div className="flex flex-col gap-4 max-w-xl w-[75%] mt-2 mx-auto">

      <ModelProfileGroup settings={settings} changeSettingsProperty={changeSettingsProperty} />
      <Separator className="my-2" />
      <GeneralGroup settings={settings} changeSettingsProperty={changeSettingsProperty} />
      <Separator className="my-2" />
      <ProxyGroup settings={settings} changeSettingsProperty={changeSettingsProperty} />

      <br />
    </div>
  )
}
