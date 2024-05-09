import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import React from 'react';
import { NodeData } from './defines';
import { NavLink } from '@mantine/core';
import { IconNotes, IconFolder } from '@tabler/icons-react';

const CustomDragPreview: React.FC<{
  monitorProps: DragLayerMonitorProps<NodeData>;
}> = ({ monitorProps: { item } }) => {
  const isNote = !item.droppable;
  const iconProps = {
    size: '1rem',
    stroke: 1.5,
  };
  return (
    <NavLink
      style={{ pointerEvents: 'none' }}
      color="gray"
      leftSection={
        isNote ? <IconNotes {...iconProps} /> : <IconFolder {...iconProps} />
      }
      label={item.text}
      variant="filled"
      active
      maw={200}
    />
  );
};

export default CustomDragPreview;
