import React, { useEffect, useState } from 'react';
import {
  selectCurrentDir,
  useGlobalStore,
  selectRelativeDirs,
} from 'src/renderer/store/useGlobalStore';
import ActivityLayout from '../layouts/ActivityLayout';
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconFolder, IconPencil, IconTrash } from '@tabler/icons-react';
import CreateMenu from './CreateMenu';
import FlexGrow from '../miscs/FlexGrow';
import { Helmet } from 'react-helmet';
import DirItem from '../dirItems/DirItem';

const DirRender: React.FC = () => {
  const [showRename, setShowRename] = useState(false);
  const { fetchCurrentDirSubItems, renameDir, deleteDir } = useGlobalStore(
    (s) => s.actions
  );
  const dirNavItems = useGlobalStore((s) => s.dirNavItems);
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
          <Group>
            <IconFolder size={32} />
            {showRename ? (
              <TextInput
                defaultValue={currentItem.name}
                autoFocus
                size="lg"
                required
                onBlur={(e) => {
                  setShowRename(false);
                  renameDir(currentItem.id, e.target.value);
                }}
              />
            ) : (
              <Text size={'32px'}>{currentItem.name}</Text>
            )}

            <FlexGrow />
            <CreateMenu />
            <Tooltip label="Rename">
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => {
                  setShowRename(true);
                }}
              >
                <IconPencil />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => {
                  deleteDir(currentItem.id);
                }}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Divider />
          <Stack>
            {dirNavItems
              .filter((t) => t.parentId === currentItem.id)
              .map((t) => (
                <DirItem key={t.id} dir={t} />
              ))}
          </Stack>
        </Stack>
      </ActivityLayout>
    </>
  );
};

export default DirRender;
