import CloseIcon from "@icons/CloseIcon";

export default function Modal({
  children,
  title,
  isOpenModal,
  toggleModal,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  isOpenModal: boolean;
  toggleModal: (state: boolean) => void;
}>) {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full
      ${!isOpenModal ? "hidden" : ""}`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full m-auto h-full flex items-center">
        <div className="relative dark:bg-white rounded-lg shadow bg-gray-600 w-full">
          <div className="flex items-center justify-between p-2 md:p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold dark:text-gray-900 text-white">
              {title}
            </h3>
            <button
              type="button"
              onClick={() => toggleModal(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <CloseIcon width={2} height={2} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
