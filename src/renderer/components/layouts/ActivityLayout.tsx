import { Box, Stack } from '@mantine/core';
import React from 'react';

const ActivityLayout: React.FC<{
  maxWidth?: number | string;
  children: React.ReactNode;
  header?: React.ReactNode;
}> = ({ header, children, maxWidth }) => {
  return (
    <Stack gap="xl" h={'100%'} style={{ overflow: 'auto' }}>
      <Box style={{ flexShrink: 0 }}>{header}</Box>
      <Box
        style={{ flexGrow: 1, overflow: 'auto' }}
        maw={maxWidth}
        w={'100%'}
        mx={'auto'}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default ActivityLayout;