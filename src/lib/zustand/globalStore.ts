import { AppMode, NodeLayout } from "@/shared/enums/global.enum";
import { ConnectionLineType } from "reactflow";
import { create } from "zustand";

interface TGlobalStore {
    mode: AppMode,
    nodeLayout: NodeLayout,
    lineStyle: ConnectionLineType,
    setMode: (mode: AppMode) => void,
    setLayout: (mode: NodeLayout) => void,
    setLineStyle: (line: ConnectionLineType) => void,
}
export const globalStore = create<TGlobalStore>((set) => ({
    mode: AppMode.Light,
    nodeLayout: NodeLayout.Vertical,
    lineStyle: ConnectionLineType.Step,
    setMode: (mode: AppMode) => {
        set({ mode: mode })
    },
    setLayout: (layout: NodeLayout) => {
        set({ nodeLayout: layout })
    },
    setLineStyle: (line: ConnectionLineType) => {
        set({ lineStyle: line })
    }
}))
