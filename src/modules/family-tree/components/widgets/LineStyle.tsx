import { globalStore } from "@/lib/zustand/globalStore";
import ToggleSwitch from "@/shared/components/common/ToggleSwitch";
import { memo } from "react";
import { ConnectionLineType } from "reactflow";
import { EdgeAnimated } from "../../config/enum";

const lineStyles = Object.values(ConnectionLineType);

export default memo(() => {
  const setLineStyle = globalStore((state) => state.setLineStyle);
  const lineStyle = globalStore((state) => state.lineStyle);
  const setLineAnimation = globalStore((state) => state.setLineAnimation);

  const handleToggle = (e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setLineAnimation(EdgeAnimated.Yes);
    } else {
      setLineAnimation(EdgeAnimated.No);
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-end justify-end">
        <ToggleSwitch label="Animation" handleToggle={handleToggle} />
      </div>
      <div className="flex items-center flex-wrap gap-4 mt-2">
        {lineStyles?.map((style, index) => (
          <div
            key={index}
            onClick={() => setLineStyle(style)}
            className={`p-2 text-sm cursor-pointer rounded-sm border
                border-white border-dashed hover:bg-gray-600
                ${lineStyle === style ? "bg-gray-600" : ""}
            `}
          >
            {style}
          </div>
        ))}
      </div>
    </div>
  );
});
