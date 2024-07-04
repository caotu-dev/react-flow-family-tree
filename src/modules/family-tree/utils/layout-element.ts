import { AppNodeName, EdgeAnimated } from "@/modules/family-tree/config/enum";
import { NodeLayout } from "@/shared/enums/global.enum";
import { layoutFromMap } from "entitree-flex";
import { ConnectionLineType, Edge, Node, Position } from "reactflow";
import {
  Orientation,
  connectorNodeConfig,
  decendantSpacing,
  entitreeSettings,
  nodeHeight,
  nodeWidth,
} from "../../../lib/entitree-flex/layout-config";

const { Top, Bottom, Left, Right } = Position;

export const layoutElements = (
  tree: any,
  rootId: any,
  direction = NodeLayout.Vertical,
  edgeType = ConnectionLineType.Step,
  isAnimated = EdgeAnimated.Yes
) => {
  const isTreeHorizontal = direction === NodeLayout.Horizontal;

  const { nodes: entitreeNodes, rels: entitreeEdges } = layoutFromMap(
    rootId,
    tree,
    {
      ...entitreeSettings,
      orientation: isTreeHorizontal
        ? Orientation.Horizontal
        : Orientation.Vertical,
    }
  );

  const nodes: Node[] = [],
    edges: Edge[] = [];

  entitreeEdges.forEach((edge: any) => {
    const sourceNode = edge.source.id;
    const targetNode = edge.target.id;

    const newEdge: any = {};

    newEdge.id = "e" + sourceNode + targetNode;
    newEdge.source = sourceNode;
    newEdge.target = targetNode;
    newEdge.type = edgeType;
    newEdge.animated = !!isAnimated;

    // Check if target node is spouse or sibling
    const isTargetParent = !!edge.target.isParent;
    const isTargetSpouse = !!edge.target.isSpouse;
    const isTargetSibling = !!edge.target.isSibling;

    if (isTargetSpouse) {
      newEdge.sourceHandle = isTreeHorizontal ? Bottom : Right;
      newEdge.targetHandle = isTreeHorizontal ? Top : Left;
    } else if (isTargetSibling) {
      newEdge.sourceHandle = isTreeHorizontal ? Top : Left;
      newEdge.targetHandle = isTreeHorizontal ? Bottom : Right;
    } else if (isTargetParent) {
      newEdge.sourceHandle = isTreeHorizontal ? Left : Top;
      newEdge.targetHandle = isTreeHorizontal ? Right : Bottom;
    } else {
      newEdge.sourceHandle = isTreeHorizontal ? Right : Bottom;
      newEdge.targetHandle = isTreeHorizontal ? Left : Top;
    }

    edges.push(newEdge);
  });

  entitreeNodes.forEach((node: any) => {
    const newNode: any = {};

    const isParent = !!node?.isParent;
    const isSpouse = !!node?.isSpouse;
    const isSibling = !!node?.isSibling;
    const isRoot = node?.id === rootId;

    if (isSpouse) {
      newNode.sourcePosition = isTreeHorizontal ? Bottom : Right;
      newNode.targetPosition = isTreeHorizontal ? Top : Left;
    } else if (isSibling) {
      newNode.sourcePosition = isTreeHorizontal ? Top : Left;
      newNode.targetPosition = isTreeHorizontal ? Bottom : Right;
    } else if (isParent) {
      newNode.sourcePosition = isTreeHorizontal ? Left : Top;
      newNode.targetPosition = isTreeHorizontal ? Right : Bottom;
    } else {
      newNode.sourcePosition = isTreeHorizontal ? Right : Bottom;
      newNode.targetPosition = isTreeHorizontal ? Left : Top;
    }

    newNode.data = { label: node.name, direction, isRoot, ...node };
    newNode.id = node.id;
    newNode.type = AppNodeName.memberNode;

    newNode.width = nodeWidth;
    newNode.height = nodeHeight;

    // Adjust x, y to center with connector node
    const positionX = isTreeHorizontal ? node.x : node.x + node.y;
    const positionY = isTreeHorizontal ? node.y + positionX / 4 : node.y;

    newNode.position = {
      x: positionX,
      y: positionY,
    };

    nodes.push(newNode);
  });

  const { layoutedNodes, layoutedEdges } = createConnectorNode(
    [...nodes],
    [...edges],
    isTreeHorizontal
  );

  return { layoutedNodes, layoutedEdges };
};

function createConnectorNode(
  nodes: Node[],
  edges: Edge[],
  isTreeHorizontal: boolean
) {
  let layoutedNodes: Node[] = [...nodes],
    layoutedEdges: Edge[] = [...edges];

  nodes
    .filter((_) => _?.data?.isSpouse)
    .forEach((node) => {
      const nodeId = node?.id;
      const spouse = nodes.find((_) => _.data?.spouses?.includes(nodeId));
      const hasChildren = !!spouse?.data?.children?.length;

      if (hasChildren) {
        const spouseId = spouse?.id;
        const connectorId = `connector-${nodeId}-${spouseId}`;

        // Create connector node between parents
        const connectorX = isTreeHorizontal
          ? node.position.x + 94
          : node.position.x - connectorNodeConfig.offsetX;
        const connectorY = isTreeHorizontal
          ? node.position.y - 60
          : node.position.y + connectorNodeConfig.offsetY;
        const connectorNode: Node = {
          ...node,
          position: {
            x: connectorX,
            y: connectorY,
          },
          id: connectorId,
          type: AppNodeName.connectorNode,
          sourcePosition: Bottom,
        };
        layoutedNodes.push(connectorNode);

        // Connect chilren edges to parent edge by connector node
        const tempEdges = layoutedEdges.map((_) => {
          const isChilrendNode = _.source === spouseId && _.target !== nodeId;
          if (isChilrendNode) {
            return {
              ..._,
              source: connectorId,
              sourceHandle: Bottom,
            };
          }
          return _;
        });
        layoutedEdges = tempEdges;
      }
    });

  return { layoutedNodes, layoutedEdges };
}
