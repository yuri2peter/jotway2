import { Button, Group } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { readClipboardText } from 'src/renderer/helpers/miscs';
import {
  useGlobalStore,
  selectCurrentDir,
} from 'src/renderer/store/useGlobalStore';
import { z } from 'zod';

const iconProps = {
  stroke: 1.5,
  size: '18px',
};

const buttonProps = {
  variant: 'subtle',
  leftSection: <IconPlus {...iconProps} />,
};

const Creates: React.FC<{}> = () => {
  const currentItem = useGlobalStore(selectCurrentDir);
  if (!currentItem) {
    return null;
  }
  return (
    <Group>
      <Button
        {...buttonProps}
        onClick={async () => {
          const text = await readClipboardText();
          const isUrl = z.string().url().safeParse(text).success;
          openContextModal({
            modal: 'CreateBookmarkModal',
            title: 'New bookmark',
            innerProps: {
              parentId: currentItem.id,
              defaultUrl: isUrl ? text : '',
            },
          });
        }}
      >
        Bookmark
      </Button>
      <Button {...buttonProps}>Note</Button>
      <Button
        {...buttonProps}
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
        Subfolder
      </Button>
    </Group>
  );
};

export default Creates;
