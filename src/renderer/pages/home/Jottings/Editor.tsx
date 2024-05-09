import { Stack, Textarea } from '@mantine/core';
import React from 'react';

const Editor: React.FC<{}> = () => {
  return (
    <Stack>
      <Textarea
        placeholder="Autosize with no rows limit"
        label="Autosize with no rows limit"
        autosize
        minRows={2}
      />
    </Stack>
  );
};

export default Editor;
