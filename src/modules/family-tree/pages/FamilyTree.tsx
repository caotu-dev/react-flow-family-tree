"use client";
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { Background, ConnectionLineType, Panel } from "reactflow";

import { layoutElements } from "@/modules/family-tree/utils/layout-element";

import "reactflow/dist/style.css";
import { useFamilyStore } from "@lib/zustand/familyTreeStore";
import AddMemberModal from "../components/AddMemberModal";
import { arrToObj } from "../utils/family-tree.utils";
// import DevTools from "../components/dev-tools/DevTool";
import MemberForm from "../components/MemberForm";
import TopCenterPanel from "../components/panel/TopCenterPanel";
import TopLeftPanel from "../components/panel/TopLeftPanel";
import { NodeLayout } from "@/shared/enums/global.enum";
import { globalStore } from "@/lib/zustand/globalStore";
import TopRightPanel from "../components/panel/TopRightPanel";
import Widgets from "../components/widgets/Widgets";
import { EdgeAnimated } from "../config/enum";
import { defaultViewport, nodeTypes, treeRootId } from "../config/node-edges";
import ContextMenu from "../components/ContextMenu";

export default function FamilyTree() {
  const members = useFamilyStore((state) => state.members);
  const edges = useFamilyStore((state) => state.familyEdges);
  const nodes = useFamilyStore((state) => state.familyNodes);
  const isEdit = useFamilyStore((state) => state.isEdit);

  const toggleModal = useFamilyStore((state) => state.openModal);
  const saveFamilyNodes = useFamilyStore((state) => state.saveFamilyNodes);
  const saveFamilyEdges = useFamilyStore((state) => state.saveFamilyEdges);

  const nodeLayout = globalStore((state) => state.nodeLayout);
  const lineStyle = globalStore((state) => state.lineStyle);
  const lineAnimation = globalStore((state) => state.lineAnimation);
  const background = globalStore((state) => state.background);

  const [menu, setMenu] = useState<{} | null>(null);
  const ref = useRef<any>(null);

  const resetTree = () => {
    saveFamilyNodes([]);
    saveFamilyEdges([]);
  };

  const renderFamilyTreeCb = useCallback(
    (
      membersData: any,
      layout = NodeLayout.Vertical,
      edgeType = ConnectionLineType.Step,
      isAnimated = EdgeAnimated.Yes
    ) => {
      const { layoutedNodes, layoutedEdges } = layoutElements(
        membersData,
        treeRootId,
        layout,
        edgeType,
        isAnimated
      );

      // Reset current nodes and edges
      resetTree();

      setTimeout(() => {
        saveFamilyNodes([...layoutedNodes]);
        saveFamilyEdges([...layoutedEdges]);
      }, 0);
    },
    []
  );

  const onNodeContextMenu = useCallback(
    (event: any, node: any) => {
      // Prevent native context menu from showing
      event.preventDefault();
      if(!ref.current) return;

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current?.getBoundingClientRect() ;
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  useEffect(() => {
    if (members.length > 0) {
      const obj = arrToObj(members);
      renderFamilyTreeCb(obj, nodeLayout, lineStyle, lineAnimation);
    } else {
      resetTree();
    }
  }, [members, nodeLayout, lineStyle, lineAnimation]);

  return (
    <div className="flex items-center justify-center">
      <div className="h-dvh w-dvw bg-white relative dark:bg-gray-700">
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          fitView
          nodeTypes={nodeTypes}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          defaultViewport={defaultViewport}
        >
          <Background variant={background} />

          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}

          {/* <DevTools /> */}

          {/* Panels */}
          <Panel position="top-center">
            <TopCenterPanel
              nodes={nodes}
              toggleModal={toggleModal}
              resetTree={resetTree}
            />
          </Panel>
          <Panel position="top-left">
            <TopLeftPanel />
          </Panel>
          <Panel position="top-right">
            <TopRightPanel />
          </Panel>
          <Panel position="bottom-center">
            <Widgets />
          </Panel>
        </ReactFlow>
      </div>
      <AddMemberModal title={isEdit ? "Edit member" : "Add new member"}>
        <MemberForm />
      </AddMemberModal>
    </div>
  );
}
