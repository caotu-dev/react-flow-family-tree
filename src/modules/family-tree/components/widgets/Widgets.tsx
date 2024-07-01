import { globalStore } from "@/lib/zustand/globalStore";
import ToggleSwitch from "@/shared/components/common/ToggleSwitch";
import ChevUpIcon from "@/shared/icons/ChevUpIcon";
import { memo, useState } from "react";
import { ConnectionLineType } from "reactflow";
import { EdgeAnimated } from "../../config/enum";
import LineStyle from "./LineStyle";
import ChangeBackground from "./ChangeBackground";
import ChangeLayout from "./ChangeLayout";

const lineStyles = Object.values(ConnectionLineType);

export default memo(() => {
  const setLineStyle = globalStore((state) => state.setLineStyle);
  const lineStyle = globalStore((state) => state.lineStyle);
  const setLineAnimation = globalStore((state) => state.setLineAnimation);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setLineAnimation(EdgeAnimated.Yes);
    } else {
      setLineAnimation(EdgeAnimated.No);
    }
  };

  return (
    <>
      <div
        className={`flex justify-center h-10 shadow-4xl ${
          isExpanded ? "w-full rotate-180 -top-5 absolute" : "w-20"
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 cursor-pointer flex items-center justify-center border-2 rounded-full bg-gray-700"
        >
          <ChevUpIcon color="white" />
        </button>
      </div>
      <div
        className={`items-start border rounded-md bg-gray-800 px-2 pb-2 pt-4 shadow-2xl ${
          isExpanded ? "flex" : "hidden"
        }`}
      >
        <div className="w-1/2 border-r-2"><LineStyle /></div>
        <div className="w-1/3 border-r-2"><ChangeBackground /></div>
        <div className="w-1/3"><ChangeLayout /></div>
      </div>
    </>
  );
});
