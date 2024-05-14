import { Text } from '@mantine/core';
import React from 'react';
import Editor from './Editor';

const Jottings: React.FC<{}> = () => {
  return (
    <>
      <Text c={'gray'}>Take notes effortlessly.</Text>
      <Editor />
    </>
  );
};

export default Jottings;
