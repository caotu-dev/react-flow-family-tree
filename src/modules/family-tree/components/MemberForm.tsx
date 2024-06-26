import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import AddIcon from "./AddIcon";
import { useEffect, useMemo, useRef, useState } from "react";

export default function MemberForm() {
  const formRef = useRef<any>();
  const [error, setError] = useState("");

  const addMember = useFamilyStore((state) => state.add);
  const toggleModal = useFamilyStore((state) => state.openModal);
  const baseId = useFamilyStore((state) => state.baseId);
  const getSelectedMember = useFamilyStore((state) => state.getSelectedMember);
  const selectedUser = getSelectedMember();

  const checkIfAllowAddSpouse = () => {
    if (selectedUser?.spouses?.length && selectedUser?.spouses?.length > 0) {
      return false;
    }
    if (!selectedUser?.isSpouse) {
      return true;
    }
    return false;
  };

  const checkIfAllowAddChild = () => {
    if(selectedUser?.isSpouse) return true;
    if (selectedUser?.spouses?.length && selectedUser?.spouses?.length > 0) {
      return true;
    }
    return false;
  };

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

    addMember(member);
    toggleModal(false);
    formRef?.current?.reset();
  };

  return (
    <>
      <div className="w-full p-1 text-center">
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
      <form ref={formRef} className="p-4 md:p-5" action={submitAction}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter name"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="dob"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Dob <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder=""
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="sex"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sex <span className="text-red-500">*</span>
            </label>
            <select
              id="sex"
              name="sex"
              defaultValue="male"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {baseId && (
            <div className="col-span-2">
              <label
                htmlFor="relationship"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Relationship <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="relationship"
                defaultValue="spouse"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                {checkIfAllowAddSpouse() && (
                  <option value="spouse">Spouse</option>
                )}
                {checkIfAllowAddChild() && <option value="child">Child</option>}
                {/* {!selectedUser?.isSibling && (
                  <option value="siblings">Siblings</option>
                )} */}
              </select>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <AddIcon />
            Add
          </button>
        </div>
      </form>
    </>
  );
}
