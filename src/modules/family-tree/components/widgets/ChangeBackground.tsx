import { globalStore } from "@/lib/zustand/globalStore";
import { memo } from "react";
import { BackgroundVariant } from "reactflow";

const backgrounds = Object.values(BackgroundVariant);

export default memo(() => {
  const setBackground = globalStore((state) => state.setBackground);
  const background = globalStore((state) => state.background);

  return (
    <div className="p-2">
      <div className="flex items-center flex-wrap gap-4 mt-2">
        {backgrounds?.map((bg, index) => (
          <div
            key={index}
            onClick={() => setBackground(bg)}
            className={`p-2 text-sm cursor-pointer rounded-sm border
                border-white border-dashed hover:bg-gray-600
                ${background === bg ? "bg-gray-600" : ""}
            `}
          >
            {bg}
          </div>
        ))}
      </div>
    </div>
  );
});
