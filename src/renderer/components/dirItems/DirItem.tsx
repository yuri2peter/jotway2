import {
  ActionIcon,
  Anchor,
  Group,
  Stack,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconFolder, IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dir } from 'src/common/type/dir';
import FlexGrow from '../miscs/FlexGrow';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';

const DirItem: React.FC<{ dir: Dir }> = ({ dir }) => {
  const [showRename, setShowRename] = useState(false);
  const { renameDir, deleteDir } = useGlobalStore((s) => s.actions);
  return (
    <Group>
      <IconFolder />
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
            deleteDir(dir.id);
          }}
        >
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default DirItem;
