import React, { useEffect } from 'react';
import {
  selectCurrentDir,
  useGlobalStore,
  selectRelativeDirs,
} from 'src/renderer/store/useGlobalStore';
import ActivityLayout from '../layouts/ActivityLayout';
import {
  Anchor,
  Breadcrumbs,
  Divider,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconFolderOpen } from '@tabler/icons-react';
import FlexGrow from '../miscs/FlexGrow';
import { Helmet } from 'react-helmet';
import DirItem from '../dirItems/DirItem';
import BookmarkItem from '../dirItems/BookmarkItem';
import Actions from './Actions';
import Creates from './Creates';

const DirRender: React.FC = () => {
  const { fetchCurrentDirSubItems } = useGlobalStore((s) => s.actions);
  const dirNavItems = useGlobalStore((s) => s.dirNavItems);
  const currentDirSubItems = useGlobalStore((s) => s.currentDirSubItems);
  const currentItem = useGlobalStore(selectCurrentDir);
  const relativeDirs = useGlobalStore(selectRelativeDirs);
  useEffect(() => {
    fetchCurrentDirSubItems();
  }, [fetchCurrentDirSubItems, currentItem?.id]);
  if (!currentItem) {
    return null;
  }
  return (
    <>
      <Helmet>
        <title>{currentItem.name}</title>
      </Helmet>
      <ActivityLayout
        maxWidth={600}
        header={
          <Breadcrumbs>
            <></>
            {relativeDirs.map((t) => (
              <Anchor key={t.id} to={`/d/${t.id}`} component={Link} c="blue">
                {t.name}
              </Anchor>
            ))}
          </Breadcrumbs>
        }
      >
        <Stack gap={'xl'}>
          <Stack gap={'md'}>
            <Group wrap="nowrap" align="center">
              <IconFolderOpen size={32} stroke={1.5} />
              <Text size={'32px'}>{currentItem.name}</Text>
              <FlexGrow />
              <Actions />
            </Group>
            <Creates />
          </Stack>
          <Divider />
          <Stack>
            {dirNavItems
              .filter((t) => t.parentId === currentItem.id)
              .map((t) => (
                <DirItem key={t.id} dir={t} />
              ))}
            {currentDirSubItems.bookmarkShorts.map((t) => (
              <BookmarkItem key={t.id} bookmark={t} />
            ))}
          </Stack>
        </Stack>
      </ActivityLayout>
    </>
  );
};

export default DirRender;
