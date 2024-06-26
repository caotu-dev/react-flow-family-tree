"use client";

import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import { Member } from "../types/member.types";
import AddIcon from "./AddIcon";

export default function MemberItem({ data }: { data: Member }) {
  const toggleModal = useFamilyStore((state) => state.openModal);
  const setBaseId = useFamilyStore((state) => state.setBaseId);
  const addMember = () => {
    setBaseId(data.id);
    toggleModal(true);
  };
  //   dark:bg-gray-800 dark:border-gray-700
  return (
    <div
      className={`w-full max-w-sm bg-white border relative border-gray-200 rounded-lg shadow
    ${
      data?.sex === "male"
        ? "dark:bg-blue-700 dark:border-blue-700"
        : "dark:bg-pink-600 dark:border-pink-600"
    }
    `}
    >
      <div className="flex items-center p-2 pb-6">
        <img
          className="w-14 h-14 rounded-full shadow-lg"
          src={data?.avatar}
          alt={data?.name}
        />
        <div className="pl-2">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            {data?.name}
          </h5>
          {data?.dob && (
            <div className="text-sm text-gray-500 dark:text-white">
              Dob: <span className="font-bold">{data?.dob}</span>
            </div>
          )}
          {data?.isSpouse && (
            <div className="text-sm text-gray-500 dark:text-white">
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
          onClick={addMember}
          className="w-10 h-10 cursor-pointer flex items-center justify-center border border-dashed rounded-full bg-gray-700"
        >
          <AddIcon color="white" />
        </button>
      </div>
    </div>
  );
}
