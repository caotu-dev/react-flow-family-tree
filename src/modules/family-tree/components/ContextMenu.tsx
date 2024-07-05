import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import DeleteIcon from "@/shared/icons/DeleteIcon";
import EditIcon from "@/shared/icons/EditIcon";
import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";

const btnStyle = `flex gap-2 items-center w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600
                dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`;

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: any) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const deleteMember = useFamilyStore((state) => state.delete);
  const toggleModal = useFamilyStore((state) => state.openModal);
  const setBaseId = useFamilyStore((state) => state.setBaseId);

  const openMemberFormModal = (isEdit = false) => {
    setBaseId(id);
    toggleModal(true, isEdit);
  };

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-10"
      {...props}
    >
      <div className="w-36 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <button
          type="button"
          className={btnStyle}
          onClick={() => openMemberFormModal(true)}
        >
          <div className="w-6"><EditIcon /></div>
          <span>Edit</span>
        </button>
        <button
          type="button"
          className={btnStyle}
          onClick={() => deleteMember(id)}
        >
          <div className="w-6"><DeleteIcon /></div>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
