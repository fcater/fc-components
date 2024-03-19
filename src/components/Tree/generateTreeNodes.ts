import { TreeProps } from ".";

type originTreeNode = Pick<TreeProps, "data">;
type originNode = originTreeNode["data"][number];

export type TreeNode = {
  id: string;
  label: string;
  level?: number;
  isLeaf?: boolean;
  children?: TreeNode[];
  parent?: TreeNode | null;
};

const convertData = (node: originNode, parent: TreeNode | null = null, level = 0): TreeNode => {
  const newNode: TreeNode = {
    ...node,
    parent: parent,
    level,
    isLeaf: !node.children || node.children.length === 0,
  };

  if (newNode.children) {
    newNode.children = newNode.children.map((child) => convertData(child, newNode, level + 1));
  }
  return newNode;
};

const generateTreeNodes = ({ data }: originTreeNode) => {
  return data.map((_) => convertData(_));
};

export default generateTreeNodes;
