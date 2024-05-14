import React from 'react';
import ActivityRender from 'src/renderer/activities/ActivityRender';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';

const AppMain: React.FC<{}> = () => {
  const { id } = useGlobalStore((s) => s.activity);
  return <ActivityRender id={id} />;
};

export default AppMain;
