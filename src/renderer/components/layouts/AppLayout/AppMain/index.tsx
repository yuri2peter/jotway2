import React from 'react';
import ActivityRender from 'src/renderer/activities/ActivityRender';
import { Outlet } from 'react-router-dom';
import DirRender from 'src/renderer/components/DirRender';

const AppMain: React.FC<{}> = () => {
  return (
    <>
      <Outlet />
      <ActivityRender />
      <DirRender />
    </>
  );
};

export default AppMain;
