import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import {
  Tree,
  MultiBackend,
  getBackendOptions,
} from '@minoru/react-dnd-treeview';
import styles from './styles.module.css';
import SampleData from './sample.json';
import CustomNode from './CustomNode';
import { ROOT_ID, TreeData } from './defines';
import CustomDragPreview from './CustomDragPreview';
import Placeholder from './Placeholder';
import { Box } from '@mantine/core';

const NoteTreeContent: React.FC<{ containerRef: HTMLElement }> = ({
  containerRef,
}) => {
  const [treeData, setTreeData] = useState(SampleData as TreeData);
  const handleDrop = (newTree: TreeData) => {
    setTreeData(newTree);
  };
  return (
    <DndProvider
      backend={MultiBackend}
      options={getBackendOptions({
        touch: {},
        html5: {
          rootElement: containerRef,
        },
      })}
    >
      <Tree
        tree={treeData}
        rootId={ROOT_ID}
        enableAnimateExpand
        render={(node, { depth, isOpen, onToggle, handleRef }) => (
          <CustomNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            onToggle={onToggle}
            handleRef={handleRef}
          />
        )}
        dragPreviewRender={(monitorProps) => (
          <CustomDragPreview monitorProps={monitorProps} />
        )}
        onDrop={handleDrop}
        classes={{
          root: styles.treeRoot,
          draggingSource: styles.draggingSource,
          placeholder: styles.placeholderContainer,
          dropTarget: styles.dropTarget,
        }}
        sort={false}
        insertDroppableFirst={false}
        canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
          if (dropTargetId === ROOT_ID) {
            return true;
          }
          return dropTarget?.droppable && dropTargetId !== dragSource?.id;
        }}
        dropTargetOffset={5}
        placeholderRender={(node, { depth }) => (
          <Placeholder node={node} depth={depth} />
        )}
      />
    </DndProvider>
  );
};

const NoteTree: React.FC<{}> = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  return (
    <Box
      ref={(r) => {
        if (r) {
          setRef(r);
        }
      }}
    >
      {ref && <NoteTreeContent containerRef={ref} />}
    </Box>
  );
};

export default NoteTree;
