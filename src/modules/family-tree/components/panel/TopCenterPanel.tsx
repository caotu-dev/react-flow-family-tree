export default function TopCenterPanel({nodes, toggleModal, resetTree} : any) {
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={() => toggleModal(true)}
        disabled={nodes.length > 0}
        className={`flex items-center justify-center text-white
      border border-dashed rounded-full p-2
      w-30 ${
        nodes.length > 0 ? "cursor-not-allowed bg-green-600" : "bg-green-900"
      }`}
      >
        {/* <AddIcon width={6} /> */}
        <span className="font-bold">Add a person</span>
      </button>
      <button
        type="button"
        onClick={() => resetTree()}
        disabled={nodes.length === 0}
        className={`flex items-center justify-center text-white
      border border-dashed rounded-full p-2
      w-28 ${
        nodes.length === 0 ? "cursor-not-allowed bg-red-400" : "bg-red-700"
      } `}
      >
        {/* <CloseIcon width={6} /> */}
        <span className="font-bold">Reset</span>
      </button>
    </div>
  );
}
