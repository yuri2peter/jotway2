import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DirRender from 'src/renderer/components/DirRender';
import NoItem from 'src/renderer/components/miscs/NoItem';
import {
  selectCurrentDir,
  useGlobalStore,
} from 'src/renderer/store/useGlobalStore';

const PageDir: React.FC<{}> = () => {
  const { id = '' } = useParams();
  const { setCurrentDirId } = useGlobalStore((s) => s.actions);
  const currentDir = useGlobalStore(selectCurrentDir);
  useEffect(() => {
    if (id) {
      setCurrentDirId(id);
    }
  }, [id, setCurrentDirId]);
  if (!currentDir) {
    return <NoItem />;
  }
  return <DirRender />;
};

export default PageDir;
