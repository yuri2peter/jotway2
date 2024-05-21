import {
  Stack,
  Group,
  CloseButton,
  Text,
  Anchor,
  CopyButton,
  Tooltip,
  ActionIcon,
  rem,
} from '@mantine/core';
import { IconCheck, IconCopy, IconFile } from '@tabler/icons-react';
import React from 'react';
import { FileDropItem } from 'src/common/type/fileDrop';
import { bytesToSize } from 'src/common/utils/string';
import FlexGrow from 'src/renderer/components/miscs/FlexGrow';
import { useFileDropStore } from './store';

const FileItem: React.FC<{ item: FileDropItem }> = ({ item }) => {
  const { deleteItem } = useFileDropStore((s) => s.actions);
  const downloadLink = window.location.origin + item.url;
  return (
    <Stack gap={0}>
      <Group wrap="nowrap">
        <Anchor
          c={'violet'}
          href={downloadLink}
          target="_blank"
          download={item.originalFilename}
        >
          <IconFile stroke={1.5} size={20} style={{ marginRight: 4 }} />
          {item.originalFilename}
        </Anchor>
        <FlexGrow />
        <Text c="gray">{bytesToSize(item.size)}</Text>
        <CopyButton value={downloadLink} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? 'Copied' : 'Copy link'}
              withArrow
              position="right"
            >
              <ActionIcon
                color={copied ? 'teal' : 'gray'}
                variant="subtle"
                onClick={copy}
              >
                {copied ? (
                  <IconCheck style={{ width: rem(16) }} />
                ) : (
                  <IconCopy style={{ width: rem(16) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
        <CloseButton
          onClick={() => {
            deleteItem(item.newFilename);
          }}
        />
      </Group>
    </Stack>
  );
};

export default FileItem;
