import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import {
  IconWorldWww,
  IconFolder,
  IconNotes,
  IconPencil,
  IconTrash,
  IconDotsVertical,
} from '@tabler/icons-react';
import React from 'react';
import {
  useGlobalStore,
  selectCurrentDir,
} from 'src/renderer/store/useGlobalStore';

const iconProps = {
  color: 'gray',
  stroke: 1.5,
};

const Actions: React.FC<{}> = () => {
  const currentItem = useGlobalStore(selectCurrentDir);
  const { deleteDir } = useGlobalStore((s) => s.actions);
  if (!currentItem) {
    return null;
  }
  return (
    <Menu shadow="md" width={200} trigger="click-hover">
      <Menu.Target>
        <ActionIcon variant="subtle">
          <IconDotsVertical {...iconProps} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconFolder {...iconProps} />}
          onClick={() => {
            openContextModal({
              modal: 'CreateDirModal',
              title: 'New subfolder',
              innerProps: {
                parentId: currentItem.id,
                autoDirect: false,
              },
            });
          }}
        >
          New subfolder
        </Menu.Item>
        <Menu.Item
          leftSection={<IconWorldWww {...iconProps} />}
          onClick={() => {
            openContextModal({
              modal: 'CreateBookmarkModal',
              title: 'New bookmark',
              innerProps: {
                parentId: currentItem.id,
              },
            });
          }}
        >
          New Bookmark
        </Menu.Item>
        <Menu.Item
          leftSection={<IconNotes {...iconProps} />}
          onClick={() => {}}
        >
          New Note
        </Menu.Item>
        <Menu.Item
          leftSection={<IconPencil {...iconProps} />}
          onClick={() => {
            openContextModal({
              modal: 'RenameDirModal',
              title: 'Rename folder',
              innerProps: {
                id: currentItem.id,
                initialName: currentItem.name,
              },
            });
          }}
        >
          Rename
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash {...iconProps} />}
          onClick={() => {
            deleteDir(currentItem.id);
          }}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Actions;
