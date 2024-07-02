import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import {
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import { toPng } from "html-to-image";
import CloseIcon from "@/shared/icons/CloseIcon";
import AddIcon from "@/shared/icons/AddIcon";
import DownloadIcon from "@/shared/icons/DownloadIcon";

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");
  const fileName = `famitree_${new Date().getTime()}.png`;
  a.setAttribute("download", fileName);
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

export default function TopCenterPanel({ nodes, toggleModal, resetTree }: any) {
  const reset = useFamilyStore((state) => state.reset);
  const resetAll = () => {
    resetTree();
    reset();
  };

  const { getNodes } = useReactFlow();
  const download = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    const flowContainterRef = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;
    if (!flowContainterRef) return;

    toPng(flowContainterRef, {
      backgroundColor: "#1a365d",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: String(imageWidth),
        height: String(imageHeight),
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
      fetchRequestInit: { mode: "no-cors" },
      cacheBust: true,
    })
      .then(downloadImage)
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      {nodes.length === 0 ? (
        <button
          type="button"
          onClick={() => toggleModal(true)}
          className={`flex items-center justify-center text-white bg-green-700
          border border-dashed rounded-full p-2`}
        >
          <div className="w-6">
            <AddIcon width={2} />
          </div>
          <span className="font-bold">Add a person</span>
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={resetAll}
            className={`flex items-center justify-center text-white
            border border-dashed rounded-full p-2 bg-red-700
            w-28`}
          >
            <div className="w-6">
              <CloseIcon width={2} />
            </div>
            <span className="font-bold">Reset</span>
          </button>
          <button
            type="button"
            onClick={download}
            className="flex items-center gap-2 justify-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
         focus:ring-purple-300 font-medium border border-dashed rounded-full text-sm p-2
          dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            <div className="w-6">
              <DownloadIcon width={2} />
            </div>
            Download
          </button>
        </>
      )}
    </div>
  );
}
