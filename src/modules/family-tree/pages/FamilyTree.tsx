"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, { ConnectionLineType, Edge, Node, Panel } from "reactflow";

import { layoutElements } from "../../../lib/entitree-flex/layout-element";

import "reactflow/dist/style.css";
import CustomNode from "../components/CustomNode";
import { useFamilyStore } from "@/lib/zustand/familyTreeStore";
import AddMemberModal from "../components/AddMemberModal";
import { arrToObj } from "../utils/family-tree.utils";
// import DevTools from "../components/dev-tools/DevTool";
import AddIcon from "../components/AddIcon";
import MemberForm from "../components/MemberForm";

const nodeTypes = {
  custom: CustomNode,
};

export default function FamilyTree() {
  const members = useFamilyStore((state) => state.members);
  const edges = useFamilyStore((state) => state.familyEdges);
  const nodes = useFamilyStore((state) => state.familyNodes);

  const saveFamilyNodes = useFamilyStore((state) => state.saveFamilyNodes);
  const saveFamilyEdges = useFamilyStore((state) => state.saveFamilyEdges);

  const treeCb = useCallback((membersData: any) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
      membersData,
      1,
      "TB"
    );

    // Reset current nodes and edges
    saveFamilyNodes([]);
    saveFamilyEdges([]);

    setTimeout(() => {
      saveFamilyNodes([...layoutedNodes]);
      saveFamilyEdges([...layoutedEdges]);
    }, 0);
  }, []);

  useEffect(() => {
    if (members.length > 0) {
      const obj = arrToObj(members);
      treeCb(obj);
    }
  }, [members]);


  return (
    <div className="flex items-center justify-center">
      <div className="h-dvh w-dvw bg-white relative">
        <ReactFlowArea nodes={nodes} edges={edges} />
      </div>
      <AddMemberModal title="Add new member">
        <MemberForm />
      </AddMemberModal>
    </div>
  );
}

function ReactFlowArea({ nodes, edges }: any) {
  const members = useFamilyStore((state) => state.members);
  const toggleModal = useFamilyStore((state) => state.openModal);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      nodeTypes={nodeTypes}
    >
      {/* <DevTools /> */}
      <Panel position="top-center">
        {members?.length === 0 && (
          <button
            type="button"
            onClick={() => toggleModal(true)}
            className="flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 
        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium
        rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800
        dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <AddIcon />
            <span>Add a person</span>
          </button>
        )}
      </Panel>
    </ReactFlow>
  );
}
