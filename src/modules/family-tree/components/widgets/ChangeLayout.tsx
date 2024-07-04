import { globalStore } from "@/lib/zustand/globalStore";
import { NodeLayout } from "@/shared/enums/global.enum";
import { memo } from "react";

const layouts = Object.values(NodeLayout);

export default memo(() => {
  const setLayout = globalStore((state) => state.setLayout);
  const activeLayout = globalStore((state) => state.nodeLayout);

  return (
    <div className="p-2">
      <div className="flex items-center flex-wrap gap-2 mt-2">
        {layouts?.map((lt, index) => (
          <div
            key={index}
            onClick={() => setLayout(lt)}
            className={`p-2 text-sm cursor-pointer rounded-sm border
                border-white border-dashed hover:bg-gray-600
                ${activeLayout === lt ? "bg-gray-600" : ""}
            `}
          >
            {lt === NodeLayout.Vertical ? "Vertical" : "Horizontal"}
          </div>
        ))}
      </div>
    </div>
  );
});
