"use client";
import React, { useCallback, useEffect } from "react";
import ReactFlow, { ConnectionLineType, Panel } from "reactflow";

import { layoutElements } from "@lib/entitree-flex/layout-element";

import "reactflow/dist/style.css";
import CustomNode from "../components/CustomNode";
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
import Widgets from "../components/Widgets";
import { EdgeAnimated } from "../config/enum";
import { initMembers } from "../config/node-edges";

const nodeTypes = {
  custom: CustomNode,
};


export default function FamilyTree() {
  const members = useFamilyStore((state) => state.members);
  const edges = useFamilyStore((state) => state.familyEdges);
  const nodes = useFamilyStore((state) => state.familyNodes);
  const isEdit = useFamilyStore((state) => state.isEdit);
  const toggleModal = useFamilyStore((state) => state.openModal);

  const saveFamilyNodes = useFamilyStore((state) => state.saveFamilyNodes);
  const saveFamilyEdges = useFamilyStore((state) => state.saveFamilyEdges);
  const setLayout = globalStore((state) => state.setLayout);
  const nodeLayout = globalStore((state) => state.nodeLayout);
  const lineStyle = globalStore((state) => state.lineStyle);
  const lineAnimation = globalStore((state) => state.lineAnimation);

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
      const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
        membersData,
        membersData[1]?.id,
        layout,
        edgeType,
        isAnimated
      );

      // Reset current nodes and edges
      saveFamilyNodes([]);
      saveFamilyEdges([]);

      setTimeout(() => {
        saveFamilyNodes([...layoutedNodes]);
        saveFamilyEdges([...layoutedEdges]);
      }, 0);
    },
    []
  );

  useEffect(() => {
    if (members.length > 0) {
      const obj = arrToObj(members);
      renderFamilyTreeCb(obj, nodeLayout, lineStyle, lineAnimation);
    } else {
      resetTree();
    }
  }, [members, nodeLayout, lineStyle, lineAnimation]);

  // useEffect(() => {
  //   const obj = arrToObj(initMembers);
  //   renderFamilyTreeCb(obj, nodeLayout, lineStyle, lineAnimation);
  // }, [nodeLayout, lineStyle, lineAnimation]);

  const changeLayout = (layout: NodeLayout) => {
    setLayout(layout);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="h-dvh w-dvw bg-white relative dark:bg-gray-700">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodeTypes={nodeTypes}
        >
          {/* <DevTools /> */}
          <Panel position="top-center">
            <TopCenterPanel
              nodes={nodes}
              toggleModal={toggleModal}
              resetTree={resetTree}
            />
          </Panel>
          <Panel position="top-left">
            <TopLeftPanel changeLayout={changeLayout} />
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
