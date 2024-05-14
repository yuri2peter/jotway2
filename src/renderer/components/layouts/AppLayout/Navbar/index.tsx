import React from 'react';
import { Divider } from '@mantine/core';
import ActivityNav from './ActivityNav';
import DirNav from './DirNav';

const NavBar: React.FC<{}> = () => {
  return (
    <>
      <ActivityNav />
      <Divider my="md" />
      <DirNav />
    </>
  );
};

export default NavBar;
