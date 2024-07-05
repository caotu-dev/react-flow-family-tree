"use client";

import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import { Member } from "../types/member.types";
import AddIcon from "@icons/AddIcon";
import { Relationship } from "../config/enum";
import { checkIfAllowAddSpouse } from "../utils/family-tree.utils";

export default function MemberItem({ data }: Readonly<{ data: Member }>) {
  const setBaseId = useFamilyStore((state) => state.setBaseId);
  const addMember = useFamilyStore((state) => state.add);

  const addSpouse = () => {
    const member: Member = {
      id: "",
      name: `Spouse of ${data?.name}`,
      dob: "",
      sex: "",
      relationship: Relationship.Spouse,
    };
    setBaseId(data?.id);
    addMember(member);
  };

  return (
    <div
      className={`display-on-hover-parent w-[200px] border relative rounded-lg shadow
      border-gray-600 dark:border-gray-200
    ${
      data?.sex === "male"
        ? "bg-blue-700 border-blue-700"
        : data?.sex === "female"
        ? "bg-pink-600 "
        : "bg-gray-500"
    }
    `}
    >
      <div className="flex items-center p-3 pb-6">
        <div className="w-14 h-14 rounded-full shadow-lg border-white border">
          {data?.sex && (
            <img
              className="w-14 h-14 rounded-full"
              src={`/images/${data?.sex}.png`}
              alt={data?.name}
            />
          )}
        </div>
        <div className="pl-2 w-2/3">
          <h5 className="text-md font-medium text-white line-clamp-1">
            {data?.name}
          </h5>
          {data?.dob && (
            <div className="text-sm text-white">
              Dob: <span className="font-bold">{data?.dob}</span>
            </div>
          )}
        </div>
      </div>

      {checkIfAllowAddSpouse(data) && (
        <div className="absolute -bottom-5 w-full flex justify-center">
          <button
            onClick={addSpouse}
            className="w-10 h-10 cursor-pointer flex items-center justify-center border border-dashed rounded-full bg-green-700"
          >
            <AddIcon color="white" />
          </button>
        </div>
      )}
    </div>
  );
}
