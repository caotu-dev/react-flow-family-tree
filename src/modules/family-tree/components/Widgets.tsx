import { globalStore } from "@/lib/zustand/globalStore";
import ChevUpIcon from "@/shared/icons/ChevUpIcon";
import { memo, useState } from "react";
import { ConnectionLineType } from "reactflow";

const lineStyles = Object.values(ConnectionLineType);

export default memo(() => {
  const setLineStyle = globalStore((state) => state.setLineStyle);
  const lineStyle = globalStore((state) => state.lineStyle);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div
        className={`absolute  flex justify-center h-10 shadow-4xl ${
          isExpanded ? "w-full rotate-180 -top-5" : "w-20 -top-10"
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
          <p className="text-md">Line styles:</p>
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
