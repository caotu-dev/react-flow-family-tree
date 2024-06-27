"use client";

import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import { Member } from "../types/member.types";
import AddIcon from "@icons/AddIcon";
import EditIcon from "@/shared/icons/EditIcon";
import DeleteIcon from "@/shared/icons/DeleteIcon";

export default function MemberItem({ data }: { data: Member }) {
  const toggleModal = useFamilyStore((state) => state.openModal);
  const setBaseId = useFamilyStore((state) => state.setBaseId);
  const deleteMember = useFamilyStore((state) => state.delete);
  const openMemberFormModal = (isEdit = false) => {
    setBaseId(data.id);
    toggleModal(true, isEdit);
  };

  return (
    <div
      className={`display-on-hover-parent w-full max-w-sm border relative border-gray-200 rounded-lg shadow
    ${
      data?.sex === "male"
        ? "bg-blue-700 border-blue-700"
        : "bg-pink-600 border-pink-600"
    }
    `}
    >
      <div className="display-on-hover-child absolute right-2 top-0 flex justify-end gap-2">
        <button className="w-4 h-4" onClick={() => openMemberFormModal(true)}>
          <EditIcon color="white" />
        </button>
        <button className="w-4 h-4" onClick={() => deleteMember(data?.id)}>
          <DeleteIcon color="white" />
        </button>
      </div>
      <div className="flex items-center p-3 pb-6">
        <img
          className="w-14 h-14 rounded-full shadow-lg"
          src={data?.avatar}
          alt={data?.name}
        />
        <div className="pl-2">
          <h5 className="text-xl font-medium text-white">
            {data?.name}
          </h5>
          {data?.dob && (
            <div className="text-sm text-white">
              Dob: <span className="font-bold">{data?.dob}</span>
            </div>
          )}
          {data?.isSpouse && (
            <div className="text-sm text-white">
              Relationship:{" "}
              <span className="font-bold">
                {data?.sex === "male" ? "Husband" : "Wife"}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute -bottom-5 w-full flex justify-center">
        <button
          onClick={() => openMemberFormModal()}
          className="w-10 h-10 cursor-pointer flex items-center justify-center border border-dashed rounded-full bg-green-700"
        >
          <AddIcon color="white" />
        </button>
      </div>
    </div>
  );
}
