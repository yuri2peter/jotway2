import { ActionIcon, Anchor, Group, Menu, Stack, Text } from '@mantine/core';
import {
  IconFolder,
  IconDotsVertical,
  IconEdit,
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
      <Stack gap="0">
        <Anchor component={Link} to={`/d/${dir.id}`} c="orange.9">
          <IconFolder stroke={1.5} size={20} style={{ marginRight: 8 }} />
          {dir.name}
        </Anchor>
        <Text c="gray" lineClamp={2} size="sm">
          {/* N objects. */}
        </Text>
      </Stack>
      <FlexGrow />
      <Menu shadow="md" width={200} trigger="click-hover">
        <Menu.Target>
          <ActionIcon variant="subtle">
            <IconDotsVertical {...iconProps} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEdit {...iconProps} />}
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
