import { NodeModel, useDragOver } from '@minoru/react-dnd-treeview';
import React from 'react';
import { NodeData } from './defines';
import { Box, NavLink } from '@mantine/core';
import {
  IconChevronRight,
  IconChevronDown,
  IconNotes,
} from '@tabler/icons-react';
import styles from './styles.module.css';

const CustomNode: React.FC<{
  node: NodeModel<NodeData>;
  depth: number;
  isOpen: boolean;
  onToggle: () => void;
  handleRef: React.RefObject<any>;
}> = ({ node, depth, isOpen, onToggle, handleRef }) => {
  const { id, droppable } = node;
  const dragOverProps = useDragOver(id, isOpen, onToggle);
  const isNote = !droppable;
  const iconProps = {
    size: '1rem',
    stroke: 1.5,
  };
  return (
    <Box style={{ paddingInlineStart: 24 * depth }} {...dragOverProps}>
      <NavLink
        leftSection={
          <Box
            lh={0}
            ref={handleRef}
            className={styles.customNodeNavLinkLeftSection}
          >
            {isNote ? (
              <IconNotes {...iconProps} />
            ) : isOpen ? (
              <IconChevronDown {...iconProps} />
            ) : (
              <IconChevronRight {...iconProps} />
            )}
          </Box>
        }
        onClick={node.droppable ? onToggle : undefined}
        label={node.text}
      />
    </Box>
  );
};

export default CustomNode;
