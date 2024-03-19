import { useCallback, useState } from "react";
import generateTreeNodes, { TreeNode } from "./generateTreeNodes";

export type TreeProps = { data: TreeNode[] };
export type CheckState = Record<string, boolean>;

function getAllChildrenIds(node: TreeNode) {
  let childrenIds: string[] = [];
  if (node.children && node.children.length > 0) {
    for (let child of node.children) {
      childrenIds.push(child.id);
      childrenIds = childrenIds.concat(getAllChildrenIds(child));
    }
  }
  return childrenIds;
}

const checkChildren = (node: TreeNode, selectedKeys: CheckState, isCheck: boolean): CheckState => {
  const allChildrenIds = getAllChildrenIds(node);
  selectedKeys[node.id] = isCheck;
  allChildrenIds.forEach((each) => (selectedKeys[each] = isCheck));
  return selectedKeys;
};

const checkParents = (
  node: TreeNode,
  mixedKeys: CheckState,
  selectedKeys: CheckState,
  isCheck: boolean
): CheckState[] => {
  const _mixedKeys: CheckState = structuredClone(mixedKeys);
  selectedKeys[node.id] = isCheck;
  if (node.parent) node = node.parent;
  while (node) {
    const allChildrenIds = getAllChildrenIds(node);
    const isCheckedNode = allChildrenIds.every((_) => selectedKeys[_]);
    const isMixedNode = allChildrenIds.some((_) => selectedKeys[_]);
    if (isCheckedNode) {
      selectedKeys[node.id] = true;
      _mixedKeys[node.id] = false;
    } else if (isMixedNode) {
      _mixedKeys[node.id] = true;
      selectedKeys[node.id] = false;
    } else {
      _mixedKeys[node.id] = false;
      selectedKeys[node.id] = false;
    }
    if (node.parent) node = node.parent;
    else break;
  }

  return [selectedKeys, _mixedKeys];
};

function Tree({ data }: TreeProps) {
  const treeNodes = generateTreeNodes({ data });
  const [mixedKeys, setMixedKeys] = useState<CheckState>({});
  const [selectedKeys, setSelectedKeys] = useState<CheckState>({});

  const handleCheckboxClick = useCallback(
    (node: TreeNode) => {
      const isCheck = !selectedKeys[node.id];

      const _selectedKeys = checkChildren(node, selectedKeys, isCheck);
      const [selected, mixed] = checkParents(node, mixedKeys, _selectedKeys, isCheck);

      setSelectedKeys(selected);
      setMixedKeys(mixed);
    },
    [mixedKeys, selectedKeys]
  );

  const renderTreeNode = useCallback(
    (node: TreeNode) => (
      <ul key={node.id} style={{ margin: 10 }}>
        <li>
          <label htmlFor={node.id}>
            <input
              type="checkbox"
              id={node.id}
              checked={Boolean(selectedKeys[node.id])}
              onChange={() => handleCheckboxClick(node)}
            />{" "}
            {Boolean(mixedKeys[node.id]) && (
              <span style={{ position: "absolute", transform: "translateX(-18px)translateY(-2px)" }}>x</span>
            )}
            {node.label}
          </label>
        </li>
        {node.children && node.children.map((child) => renderTreeNode(child))}
      </ul>
    ),
    [handleCheckboxClick, mixedKeys, selectedKeys]
  );

  return <>{treeNodes.map((node) => renderTreeNode(node))}</>;
}

export default Tree;
