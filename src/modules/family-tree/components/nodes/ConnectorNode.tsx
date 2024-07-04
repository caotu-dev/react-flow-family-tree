import { NodeLayout } from "@/shared/enums/global.enum";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const { Bottom, Right } = Position;

export default memo(({ data }: any) => {
  const { direction } = data;

  const isTreeHorizontal = direction === NodeLayout.Horizontal;

  return (
    <div className="nodrag">
      <Handle
        type="source"
        position={isTreeHorizontal ? Right : Bottom}
        id={isTreeHorizontal ? Right : Bottom}
      />

      <button type="button" className="text-black h-[0px] bg-gray-100">
        &nbsp;
      </button>
    </div>
  );
});
