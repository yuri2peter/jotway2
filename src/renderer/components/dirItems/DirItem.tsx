import { ActionIcon, Anchor, Group, TextInput, Tooltip } from '@mantine/core';
import { IconFolder, IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
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
  const [showRename, setShowRename] = useState(false);
  const { renameDir, deleteDir } = useGlobalStore((s) => s.actions);
  return (
    <Group wrap="nowrap" align="start">
      <IconFolder stroke={1.5} />
      {showRename ? (
        <TextInput
          defaultValue={dir.name}
          autoFocus
          required
          onBlur={(e) => {
            setShowRename(false);
            renameDir(dir.id, e.target.value);
          }}
        />
      ) : (
        <Anchor component={Link} to={`/d/${dir.id}`}>
          {dir.name}
        </Anchor>
      )}
      <FlexGrow />
      <ActionIcon.Group>
        <Tooltip label="Rename">
          <ActionIcon variant="default">
            <IconPencil
              {...iconProps}
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
            />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Delete">
          <ActionIcon variant="default">
            <IconTrash
              {...iconProps}
              onClick={() => {
                deleteDir(dir.id);
              }}
            />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
    </Group>
  );
};

export default DirItem;
