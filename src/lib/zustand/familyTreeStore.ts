"use client";

import { Member } from "@/modules/family-tree/types/member.types";
import { handleAddMember } from "@/modules/family-tree/utils/family-tree.utils";
import { Edge, Node } from "reactflow";
import { create } from "zustand";

interface TFamilyTree {
    members: Member[];
    isOpenedModal: boolean,
    baseId: string | null;
    familyNodes: Node[];
    saveFamilyNodes: (nodes: Node[]) => void;
    familyEdges: Edge[];
    saveFamilyEdges: (edges: Edge[]) => void;
    add: (newMember: Member) => void;
    update: (newMember: Member) => void;
    delete?: (id: number) => void;
    openModal: (state: boolean) => void;
    setBaseId: (id: string) => void;
    getSelectedMember: () => Member | null;
}

export const useFamilyStore = create<TFamilyTree>((set, get) => ({
    members: [],
    isOpenedModal: false,
    baseId: null,
    familyNodes: [],
    familyEdges: [],
    add: (newMember: Member) => {
        const membersState = get().members;
        const baseId = get().baseId;
        const newMembers = handleAddMember(membersState, newMember, baseId)
        set({ members: [...newMembers] })
    },
    update: (newMember: Member) => {
        const membersState = get().members
        set({ members: membersState })
    },
    openModal: (state: boolean) => {
        set({ isOpenedModal: state });
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