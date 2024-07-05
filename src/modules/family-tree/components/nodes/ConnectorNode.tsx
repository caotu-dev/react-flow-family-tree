import { NodeLayout } from "@/shared/enums/global.enum";
import AddIcon from "@/shared/icons/AddIcon";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Relationship } from "../../config/enum";
import { Member } from "../../types/member.types";
import { useFamilyStore } from "@/lib/zustand/familyTreeStore";

const { Bottom, Right } = Position;

export default memo(({ data }: any) => {
  const { direction } = data;
  const addMember = useFamilyStore((state) => state.add);
  const setBaseId = useFamilyStore((state) => state.setBaseId);

  const isTreeHorizontal = direction === NodeLayout.Horizontal;

  const addChild = () => {
    const member: Member = {
      id: "",
      name: `Child of ${data?.name}`,
      dob: "",
      sex: "",
      relationship: Relationship.Child,
    };
    setBaseId(data?.id)
    addMember(member);
  };

  return (
    <div className="nodrag">
      <Handle
        type="source"
        position={isTreeHorizontal ? Right : Bottom}
        id={isTreeHorizontal ? Right : Bottom}
      />

      {/* <button type="button" className="text-black h-[0px] bg-gray-100">
        &nbsp;
      </button> */}
      <button
        onClick={addChild}
        className="w-6 h-6 cursor-pointer flex items-center justify-center border border-dashed rounded-full bg-green-700"
      >
        <AddIcon color="white" />
      </button>
    </div>
  );
});
