import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import MemberItem from "../MemberItem";
import { NodeLayout } from "@/shared/enums/global.enum";

const { Top, Bottom, Left, Right } = Position;

const nodeStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default memo(({ data }: any) => {
  const { isSpouse, isSibling, direction } = data;

  const isTreeHorizontal = direction === NodeLayout.Horizontal;

  const getTargetPosition = () => {
    if (isSpouse) {
      return isTreeHorizontal ? Top : Left;
    } else if (isSibling) {
      return isTreeHorizontal ? Bottom : Right;
    }
    return isTreeHorizontal ? Left : Top;
  };

  const isRootNode = data?.isRoot;
  const hasParents = !!data?.parents?.length;
  const hasSiblings = !!data?.siblings?.length;
  const hasSpouses = !!data?.spouses?.length;

  return (
    <div className="nodrag">
      {/* For parents */}
      {hasParents && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Left : Top}
          id={isTreeHorizontal ? Left : Top}
        />
      )}

      {/* For spouses */}
      {hasSpouses && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Bottom : Right}
          id={isTreeHorizontal ? Bottom : Right}
        />
      )}

      {/* For siblings */}
      {hasSiblings && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Top : Left}
          id={isTreeHorizontal ? Top : Left}
        />
      )}

      {/* Target Handle */}
      {!isRootNode && (
        <Handle
          type={"target"}
          position={getTargetPosition()}
          id={getTargetPosition()}
        />
      )}
      <div style={nodeStyle}>
        <MemberItem data={data} />
      </div>
    </div>
  );
});
