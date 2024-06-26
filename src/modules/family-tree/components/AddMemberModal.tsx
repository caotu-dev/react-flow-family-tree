import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import CloseIcon from "./CloseIcon";

export default function AddMemberModal({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string
}>) {
  const toggleModal = useFamilyStore((state) => state.openModal);
  const isOpenModal = useFamilyStore((state) => state.isOpenedModal);

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full
      ${!isOpenModal ? "hidden" : ""}`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full m-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              onClick={() => toggleModal(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
