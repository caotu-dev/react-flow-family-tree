import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import AddIcon from "@icons/AddIcon";
import { useRef, useState } from "react";
import {
  checkIfAllowAddChild,
  checkIfAllowAddParent,
  checkIfAllowAddSpouse,
} from "../utils/family-tree.utils";
import { Relationship } from "../config/enum";

export default function MemberForm() {
  const formRef = useRef<any>();
  const [error, setError] = useState("");

  const addMember = useFamilyStore((state) => state.add);
  const updateMember = useFamilyStore((state) => state.update);
  const toggleModal = useFamilyStore((state) => state.openModal);
  const getSelectedMember = useFamilyStore((state) => state.getSelectedMember);

  const selectedUser = getSelectedMember();
  const isEdit = useFamilyStore((state) => state.isEdit);
  const baseId = useFamilyStore((state) => state.baseId);
  const members = useFamilyStore((state) => state.members);

  const submitAction = (formData: FormData) => {
    setError("");
    const name = formData.get("name");
    const dob = formData.get("dob");
    const sex = formData.get("sex");
    const relationship = formData.get("relationship");

    if (!name || !dob || !sex) {
      setError("Some required field(s) are missing.");
      return;
    }
    const member = { name, dob, sex, relationship } as any;
    if (isEdit) {
      const editInfo = {
        ...selectedUser,
        ...member,
      };
      updateMember(editInfo);
    } else {
      addMember(member);
    }

    toggleModal(false);
    formRef?.current?.reset();
  };

  return (
    <>
      {error && (
        <div className="w-full p-1 text-center">
          <span className="text-red-500 text-sm">{error}</span>
        </div>
      )}

      <form ref={formRef} className="p-4 md:p-5" action={submitAction}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium dark:text-gray-900 text-white"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={isEdit ? selectedUser?.name : ""}
              className="bg-gray-50 border border-gray-300 dark:text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-500 dark:placeholder-black text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter name"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="dob"
              className="block mb-2 text-sm font-medium dark:text-gray-900 text-white"
            >
              Dob <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              defaultValue={isEdit ? selectedUser?.dob : ""}
              className="bg-gray-50 border border-gray-300 dark:text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-500 dark:placeholder-black text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder=""
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="sex"
              className="block mb-2 text-sm font-medium dark:text-gray-900 text-white"
            >
              Sex <span className="text-red-500">*</span>
            </label>
            <select
              id="sex"
              name="sex"
              defaultValue={isEdit ? selectedUser?.sex : ""}
              className="bg-gray-50 border border-gray-300 dark:text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-500 dark:placeholder-gray-400 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={""}>-- Select sex --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {baseId && !isEdit && (
            <div className="col-span-2">
              <label
                htmlFor="relationship"
                className="block mb-2 text-sm font-medium dark:text-gray-900 text-white"
              >
                Relationship <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="relationship"
                defaultValue={""}
                className="bg-gray-50 border border-gray-300 dark:text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-500 dark:placeholder-black text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value={""}>-- Select relationship --</option>
                {checkIfAllowAddParent(members, selectedUser) && (
                  <option value={Relationship.Parents}>Parent</option>
                )}
                {checkIfAllowAddSpouse(selectedUser) && (
                  <option value={Relationship.Spouse}>Spouse</option>
                )}
                {checkIfAllowAddChild(selectedUser) && (
                  <option value={Relationship.Child}>Child</option>
                )}
                {!selectedUser?.isSibling && (
                  <option value={Relationship.Sibling}>Siblings</option>
                )}
              </select>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
              dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <AddIcon />
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}
