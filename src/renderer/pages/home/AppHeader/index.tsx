import React from 'react';
import { APP_NAME } from 'src/common/config';
import { Text, Image } from '@mantine/core';

const AppHeader: React.FC<{}> = () => {
  return (
    <>
      <Image visibleFrom="sm" src="/assets/icon.png" h={32} />
      <Text size="xl" fw={700} c="dark">
        {APP_NAME}
      </Text>
    </>
  );
};

export default AppHeader;
