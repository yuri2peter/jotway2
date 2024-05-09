import React from 'react';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const AddTask: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      leftSection={<IconPlus size={14} />}
      variant="default"
      onClick={onClick}
    >
      Add
    </Button>
  );
};

export default AddTask;
