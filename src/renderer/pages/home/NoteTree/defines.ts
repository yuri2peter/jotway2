import { NodeModel } from '@minoru/react-dnd-treeview';

export const ROOT_ID = 0;

export interface NodeData {
  noteId: string;
}

export type TreeData = NodeModel<NodeData>[];
