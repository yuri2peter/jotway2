import React, { useMemo } from 'react';
import {
  selectCurrentDir,
  useGlobalStore,
} from 'src/renderer/store/useGlobalStore';
import ActivityLayout from '../layouts/ActivityLayout';

const DirRender: React.FC = () => {
  const currentDirId = useGlobalStore((s) => s.currentDirId);
  const navMenu = useGlobalStore((s) => s.dirNavItems);
  const currentItem = useGlobalStore(selectCurrentDir);
  const relativeIds = useMemo(() => {
    const ergodicItem = (
      itemId: string,
      onFound: (id: string) => void
    ): void => {
      const item = navMenu.find((t) => t.id === itemId);
      if (item) onFound(item.id);
      if (item?.parentId) {
        ergodicItem(item.parentId, onFound);
      }
    };
    const ids: string[] = [];
    ergodicItem(currentDirId, (id) => ids.push(id));
    return ids.reverse();
  }, [currentDirId, navMenu]);
  if (!currentItem) {
    return null;
  }
  return (
    <ActivityLayout header={currentItem.name} maxWidth={600}>
      {currentItem.name}
    </ActivityLayout>
  );
};

export default DirRender;
