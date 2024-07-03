"use client";

import { initMembers } from "@/modules/family-tree/config/node-edges";
import { Member } from "@/modules/family-tree/types/member.types";
import { handleAddMember, handleDeleteMember } from "@/modules/family-tree/utils/family-tree.utils";
import { Edge, Node } from "reactflow";
import { create } from "zustand";

interface TFamilyTree {
    members: Member[];
    isOpenedModal: boolean,
    isEdit: boolean,
    baseId: string | null;
    familyNodes: Node[];
    saveFamilyNodes: (nodes: Node[]) => void;
    familyEdges: Edge[];
    saveFamilyEdges: (edges: Edge[]) => void;
    add: (newMember: Member) => void;
    update: (newMember: Member) => void;
    delete: (id: string) => void;
    reset: () => void;
    openModal: (state: boolean, isEdit?: boolean) => void;
    setBaseId: (id: string) => void;
    getSelectedMember: () => Member | null;
}

export const useFamilyStore = create<TFamilyTree>((set, get) => ({
    members: initMembers,
    isOpenedModal: false,
    isEdit: false,
    baseId: null,
    familyNodes: [],
    familyEdges: [],
    add: (newMember: Member) => {
        const membersState = get().members;
        const baseId = get().baseId;
        const newMembers = handleAddMember(membersState, newMember, baseId)
        set({ members: [...newMembers] })
    },
    update: (editedMember: Member) => {
        const membersState = get().members;
        const memberIndex = membersState.findIndex(_ => _?.id === editedMember?.id);
        if (memberIndex !== -1) {
            membersState[memberIndex] = editedMember;
        }
        set({ members: [...membersState] })
    },
    delete: (id: string) => {
        const membersState = handleDeleteMember(get().members, id);
        set({ members: [...membersState] })
    },
    reset: () => {
        set({ members: [] })
    },
    openModal: (state: boolean, isEdit = false) => {
        set({ isOpenedModal: state });
        set({ isEdit: isEdit })
        if (!state) {
            set({ baseId: null })
        }
    },
    setBaseId: (id: string) => {
        set({ baseId: id })
    },
    saveFamilyNodes: (nodes: Node[]) => {
        set({ familyNodes: [...nodes] })
    },
    saveFamilyEdges: (edges: Edge[]) => {
        set({ familyEdges: [...edges] })
    },
    getSelectedMember: () => {
        const selectedMember = get().members?.find(_ => _?.id === get().baseId);
        return selectedMember ?? null
    }
}));