import ConnectorNode from "../components/nodes/ConnectorNode";
import MemberNode from "../components/nodes/MemberNode";
import { Member } from "../types/member.types";
import { AppNodeName } from "./enum";

export const treeRootId = 1;

export const nodeTypes = {
  [AppNodeName.memberNode]: MemberNode,
  [AppNodeName.connectorNode]: ConnectorNode,
};

export const initMembers: Member[] = [
  {
    name: "Grandpa",
    dob: "2024-07-08",
    sex: "male",
    relationship: null,
    id: "1",
    avatar: "",
    spouses: ["2"],
    children: ["3", "4"],
  },
  {
    name: "Grandma",
    dob: "2024-07-01",
    sex: "female",
    relationship: null,
    id: "2",
    avatar: "",
    isSpouse: true,
  },
  {
    name: "Father",
    dob: "2024-07-01",
    sex: "male",
    relationship: "child",
    id: "3",
    avatar: "",
    spouses: ["5"],
    children: ["6"],
    parents: ["1", "2"],
  },
  {
    name: "Uncle",
    dob: "2024-07-15",
    sex: "male",
    relationship: "child",
    id: "4",
    avatar: "",
  },
  {
    name: "Mother",
    dob: "2024-06-30",
    sex: "female",
    relationship: null,
    id: "5",
    avatar: "",
    isSpouse: true,
  },
  {
    name: "Son",
    dob: "2024-06-30",
    sex: "male",
    relationship: "child",
    id: "6",
    avatar: "",
  },
];
