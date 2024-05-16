import { ActionIcon, Tooltip } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import {
  IconWorldWww,
  IconFolder,
  IconNotes,
  IconPencil,
  IconTrash,
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
    <ActionIcon.Group>
      <Tooltip label="New Subfolder">
        <ActionIcon variant="default">
          <IconFolder
            {...iconProps}
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
          />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="New Bookmark">
        <ActionIcon variant="default">
          <IconWorldWww
            {...iconProps}
            onClick={() => {
              openContextModal({
                modal: 'CreateBookmarkModal',
                title: 'New bookmark',
                innerProps: {
                  parentId: currentItem.id,
                },
              });
            }}
          />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="New Note">
        <ActionIcon variant="default">
          <IconNotes {...iconProps} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Rename">
        <ActionIcon variant="default">
          <IconPencil
            {...iconProps}
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
          />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Delete">
        <ActionIcon variant="default">
          <IconTrash
            {...iconProps}
            onClick={() => {
              deleteDir(currentItem.id);
            }}
          />
        </ActionIcon>
      </Tooltip>
    </ActionIcon.Group>
  );
};

export default Actions;
