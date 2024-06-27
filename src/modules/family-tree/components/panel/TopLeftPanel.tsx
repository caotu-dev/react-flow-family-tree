import { globalStore } from "@/lib/zustand/globalStore";
import { NodeLayout } from "@/shared/enums/global.enum";

const btnClasses = `text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4
focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2
  dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
  dark:hover:border-gray-600 dark:focus:ring-gray-700`;

export default function TopLeftPanel({ changeLayout }: any) {
  const layout = globalStore((state) => state.nodeLayout);

  return (
    <>
      <button
        type="button"
        onClick={() => changeLayout(NodeLayout.Vertical)}
        className={`${btnClasses} ${
          layout === NodeLayout.Vertical
            ? "dark:bg-gray-700 bg-gray-300"
            : "dark:bg-gray-800 bg-white"
        }`}
      >
        Vertical Layout
      </button>
      <button
        type="button"
        onClick={() => changeLayout(NodeLayout.Horizontal)}
        className={`${btnClasses} ${
          layout === NodeLayout.Horizontal
            ? "dark:bg-gray-700 bg-gray-300"
            : "dark:bg-gray-800 bg-white"
        }`}
      >
        Horizontal Layout
      </button>
    </>
  );
}
