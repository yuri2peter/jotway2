import React from 'react';
import { NodeData } from './defines';
import { NodeModel } from '@minoru/react-dnd-treeview';
import { Box } from '@mantine/core';
import styles from './styles.module.css';

const Placeholder: React.FC<{
  node: NodeModel<NodeData>;
  depth: number;
}> = ({ depth }) => {
  return (
    <Box
      style={{
        left: 24 * depth + 12,
      }}
      className={styles.placeholder}
    ></Box>
  );
};

export default Placeholder;
