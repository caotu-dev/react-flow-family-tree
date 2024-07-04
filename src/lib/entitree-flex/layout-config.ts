export const nodeWidth = 200;
export const nodeHeight = 0;

export const Orientation = {
  Vertical: "vertical",
  Horizontal: "horizontal",
};

export const accessorSpacing = 200;
export const decendantSpacing = 200;

export const entitreeSettings: any = {
  clone: true, // returns a copy of the input, if your application does not allow editing the original object
  enableFlex: true, // has slightly better perfomance if turned off (node.width, node.height will not be read)
  firstDegreeSpacing: accessorSpacing, // spacing in px between nodes belonging to the same source, eg children with same parent
  nextAfterAccessor: "spouses", // the side node prop used to go sideways, AFTER the current node
  nextAfterSpacing: accessorSpacing, // the spacing of the "side" nodes AFTER the current node
  nextBeforeAccessor: "siblings", // the side node prop used to go sideways, BEFORE the current node
  nextBeforeSpacing: accessorSpacing, // the spacing of the "side" nodes BEFORE the current node
  nodeHeight, // default node height in px
  nodeWidth, // default node width in px
  orientation: Orientation.Vertical, // "vertical" to see parents top and children bottom, "horizontal" to see parents left and
  rootX: 0, // set root position if other than 0
  rootY: 0, // set root position if other than 0
  secondDegreeSpacing: decendantSpacing, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
  sourcesAccessor: "parents", // the prop used as the array of ancestors ids
  sourceTargetSpacing: decendantSpacing, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
  targetsAccessor: "children", // the prop used as the array of children ids
};

const connectorNodeRadius = 4;

export const connectorNodeConfig = {
  offsetX: (accessorSpacing / 2) - connectorNodeRadius,
  offsetY: 22,
};
