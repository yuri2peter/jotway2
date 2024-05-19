import { ActionIcon, Anchor, Group, Menu } from '@mantine/core';
import {
  IconFolder,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Dir } from 'src/common/type/dir';
import FlexGrow from '../miscs/FlexGrow';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { openContextModal } from '@mantine/modals';

const iconProps = {
  color: 'gray',
  stroke: 1.5,
};

const DirItem: React.FC<{ dir: Dir }> = ({ dir }) => {
  const { deleteDir } = useGlobalStore((s) => s.actions);
  return (
    <Group wrap="nowrap" align="start">
      <IconFolder stroke={1.5} />
      <Anchor component={Link} to={`/d/${dir.id}`}>
        {dir.name}
      </Anchor>
      <FlexGrow />
      <Menu shadow="md" width={200} trigger="click-hover">
        <Menu.Target>
          <ActionIcon variant="subtle">
            <IconDotsVertical {...iconProps} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconPencil {...iconProps} />}
            onClick={() => {
              openContextModal({
                modal: 'RenameDirModal',
                title: 'Rename folder',
                innerProps: {
                  id: dir.id,
                  initialName: dir.name,
                },
              });
            }}
          >
            Rename
          </Menu.Item>
          <Menu.Item
            leftSection={<IconTrash {...iconProps} />}
            onClick={() => {
              deleteDir(dir.id);
            }}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default DirItem;
