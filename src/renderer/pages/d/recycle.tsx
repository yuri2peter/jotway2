import React, { useEffect } from 'react';
import DirRecycle from 'src/renderer/components/DirRecycle';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';

const PageDirRecycle: React.FC<{}> = () => {
  const { setCurrentDirId } = useGlobalStore((s) => s.actions);
  useEffect(() => {
    setCurrentDirId('recycle');
  });
  return <DirRecycle />;
};

export default PageDirRecycle;
