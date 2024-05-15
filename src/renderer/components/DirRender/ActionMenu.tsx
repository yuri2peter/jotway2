import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import {
  IconTrash,
  IconMenu2,
  IconFolder,
  IconNote,
  IconBookmark,
} from '@tabler/icons-react';

const iconProps = {
  width: 14,
};

const ActionMenu: React.FC<{}> = () => {
  return (
    <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <IconMenu2 />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>New...</Menu.Label>
        <Menu.Item leftSection={<IconFolder {...iconProps} />}>
          Sub folder
        </Menu.Item>
        <Menu.Item leftSection={<IconNote {...iconProps} />}>Note</Menu.Item>
        <Menu.Item leftSection={<IconBookmark {...iconProps} />}>
          Bookmark
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" leftSection={<IconTrash {...iconProps} />}>
          Delete folder
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionMenu;
