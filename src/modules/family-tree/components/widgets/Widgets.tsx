import ChevUpIcon from "@/shared/icons/ChevUpIcon";
import { memo, useState } from "react";
import LineStyle from "./LineStyle";
import ChangeBackground from "./ChangeBackground";
import ChangeLayout from "./ChangeLayout";

export default memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);
  const defaultTab = 1;
  const [activeTab, setActiveTab] = useState<number>(defaultTab);
  const tabs = [
    {
      id: 1,
      selector: "line-styles",
      title: "Line styles",
    },
    {
      id: 2,
      selector: "background",
      title: "Backgrounds",
    },
    {
      id: 3,
      selector: "change-layout",
      title: "Change layouts",
    },
  ];

  const TabContent = ({ tabId }: Readonly<{ tabId: number }>) => {
    switch (tabId) {
      case 1:
        return <LineStyle />;
      case 2:
        return <ChangeBackground />;
      default:
        return <ChangeLayout />;
    }
  };

  return (
    <>
      <div
        className={`flex justify-center h-10 shadow-4xl ${
          isExpanded ? "w-full rotate-180 -top-5 absolute" : "w-20"
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 cursor-pointer flex items-center justify-center border-2 rounded-full bg-gray-700"
        >
          <ChevUpIcon color="white" />
        </button>
      </div>
      <div
        className={`border rounded-md bg-gray-800 px-2 pb-2 pt-2 shadow-2xl ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        <div className="border-b ">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            {tabs?.map((tab) => (
              <li key={tab?.id} className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 ${
                    tab?.id === activeTab ? "border-b-2 rounded-t-lg" : ""
                  }`}
                  id={`${tab?.selector}-tab`}
                  data-tabs-target={`#${tab?.selector}`}
                  type="button"
                  role="tab"
                  aria-controls={tab?.selector}
                  aria-selected={tab?.id === activeTab}
                  onClick={() => setActiveTab(tab?.id)}
                >
                  {tab?.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div id="default-tab-content">
          <TabContent tabId={activeTab} />
        </div>
      </div>
    </>
  );
});
