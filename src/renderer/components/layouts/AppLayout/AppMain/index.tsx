import React from 'react';
import { Outlet } from 'react-router-dom';

const AppMain: React.FC<{}> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppMain;
