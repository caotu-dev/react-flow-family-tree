import { globalStore } from "@/lib/zustand/globalStore";
import ToggleSwitch from "@/shared/components/common/ToggleSwitch";
import ChevUpIcon from "@/shared/icons/ChevUpIcon";
import { memo, useState } from "react";
import { ConnectionLineType } from "reactflow";
import { EdgeAnimated } from "../config/enum";

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
        className={`items-center border rounded-md bg-gray-800 p-2 shadow-2xl ${
          isExpanded ? "flex" : "hidden"
        }`}
      >
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-md">Line styles:</p>
            <ToggleSwitch label="Animation" handleToggle={handleToggle} />
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-2">
            {lineStyles?.map((style, index) => (
              <div
                key={index}
                onClick={() => setLineStyle(style)}
                className={`p-2 text-md cursor-pointer rounded-sm border
                border-white border-dashed hover:bg-gray-600
                ${lineStyle === style ? "bg-gray-600" : ""}
            `}
              >
                {style}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});
