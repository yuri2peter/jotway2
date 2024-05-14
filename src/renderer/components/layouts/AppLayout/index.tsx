import React, { useEffect } from 'react';
import MyAppShell from './AppShell';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';

const Main: React.FC<{}> = () => {
  const appReady = useGlobalStore((s) => s.appReady);
  const { syncApp } = useGlobalStore((s) => s.actions);
  useEffect(() => {
    syncApp();
  }, [syncApp]);
  if (!appReady) {
    return null;
  }
  return (
    <>
      <MyAppShell />
    </>
  );
};

export default Main;
