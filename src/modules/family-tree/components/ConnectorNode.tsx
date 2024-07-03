import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const { Top, Bottom, Left, Right } = Position;

export default memo(({ data }: any) => {
  const { isSpouse, isSibling, label, direction } = data;

  const isTreeHorizontal = direction === "LR";

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
