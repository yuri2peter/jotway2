import React from 'react';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import {
  IconFolder,
  IconNote,
  IconBookmark,
  IconPlus,
} from '@tabler/icons-react';
import {
  selectCurrentDir,
  useGlobalStore,
} from 'src/renderer/store/useGlobalStore';

const iconProps = {
  width: 14,
};

const CreateMenu: React.FC<{}> = () => {
  const currentItem = useGlobalStore(selectCurrentDir);
  const { fetchCurrentDirSubItems, createDir } = useGlobalStore(
    (s) => s.actions
  );
  return (
    <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Tooltip label="New...">
          <ActionIcon variant="subtle" color="gray">
            <IconPlus />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconFolder {...iconProps} />}
          onClick={async () => {
            await createDir(currentItem?.id, false);
            await fetchCurrentDirSubItems();
          }}
        >
          Sub folder
        </Menu.Item>
        <Menu.Item leftSection={<IconNote {...iconProps} />}>Note</Menu.Item>
        <Menu.Item leftSection={<IconBookmark {...iconProps} />}>
          Bookmark
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CreateMenu;
