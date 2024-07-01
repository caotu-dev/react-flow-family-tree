import { EdgeAnimated } from "@/modules/family-tree/config/enum";
import { AppMode, NodeLayout } from "@/shared/enums/global.enum";
import { BackgroundVariant, ConnectionLineType } from "reactflow";
import { create } from "zustand";

interface TGlobalStore {
    mode: AppMode,
    nodeLayout: NodeLayout,
    lineStyle: ConnectionLineType,
    lineAnimation: EdgeAnimated,
    background: BackgroundVariant,
    setMode: (mode: AppMode) => void,
    setLayout: (mode: NodeLayout) => void,
    setLineStyle: (line: ConnectionLineType) => void,
    setLineAnimation: (animated: EdgeAnimated) => void,
    setBackground: (bg: BackgroundVariant) => void,
}
export const globalStore = create<TGlobalStore>((set) => ({
    mode: AppMode.Light,
    nodeLayout: NodeLayout.Vertical,
    lineStyle: ConnectionLineType.Step,
    lineAnimation: EdgeAnimated.No,
    background: BackgroundVariant.Dots,
    setMode: (mode: AppMode) => {
        set({ mode: mode })
    },
    setLayout: (layout: NodeLayout) => {
        set({ nodeLayout: layout })
    },
    setLineStyle: (line: ConnectionLineType) => {
        set({ lineStyle: line })
    },
    setLineAnimation: (animated: EdgeAnimated) => {
        set({lineAnimation: animated})
    },
    setBackground: (bg: BackgroundVariant) => {
        set({background: bg})
    },
}))
