import React, { useEffect } from 'react';
import DirFavorites from 'src/renderer/components/DirFavorites';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';

const PageDirFavorites: React.FC<{}> = () => {
  const { setCurrentDirId } = useGlobalStore((s) => s.actions);
  useEffect(() => {
    setCurrentDirId('favorites');
  });
  return <DirFavorites />;
};

export default PageDirFavorites;
