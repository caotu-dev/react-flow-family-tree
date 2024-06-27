import { globalStore } from "@/lib/zustand/globalStore";
import ToggleSwitch from "@/shared/components/common/ToggleSwitch";
import { AppMode } from "@/shared/enums/global.enum";
import { useEffect } from "react";

export default function TopRightPanel() {
  const setMode = globalStore((state) => state.setMode);
  const mode = globalStore((state) => state.mode);

  const handleToggle = (e: any) => {
    const isChecked = e.target.checked;
    if(isChecked) {
        setMode(AppMode.Dark)
    }else {
        setMode(AppMode.Light)
    }
  }

  useEffect(() => {
    if(mode === AppMode.Dark) {
        setMode(AppMode.Dark)
        document.documentElement.classList.add('dark')
    }else {
        setMode(AppMode.Light)
        document.documentElement.classList.remove('dark')
    }
  }, [mode])

  return <ToggleSwitch handleToggle={handleToggle} label={mode + " mode"} />;
}
