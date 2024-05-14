import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
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
  return (
    <>
      <Helmet>{currentDir && <title>{currentDir?.name}</title>}</Helmet>
    </>
  );
};

export default PageDir;
