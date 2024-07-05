import ConnectorNode from "../components/nodes/ConnectorNode";
import MemberNode from "../components/nodes/MemberNode";
import { Member } from "../types/member.types";
import { AppNodeName } from "./enum";

export const treeRootId = 1;

export const nodeTypes = {
  [AppNodeName.memberNode]: MemberNode,
  [AppNodeName.connectorNode]: ConnectorNode,
};

export const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

export const initMembers: Member[] = [
  {
    name: "Root person",
    dob: "",
    sex: "",
    relationship: null,
    id: "1",
    avatar: "",
  }
];
