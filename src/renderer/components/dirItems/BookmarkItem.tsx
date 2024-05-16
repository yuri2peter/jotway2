import {
  ActionIcon,
  Anchor,
  Group,
  Stack,
  Tooltip,
  Text,
  CopyButton,
  rem,
} from '@mantine/core';
import {
  IconWorldWww,
  IconPencil,
  IconTrash,
  IconCheck,
  IconCopy,
} from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import FlexGrow from '../miscs/FlexGrow';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { BookmarkShort } from 'src/common/type/bookmark';
import { openContextModal } from '@mantine/modals';
import MarkdownRender from '../MarkdownRender';

const iconProps = {
  color: 'gray',
  stroke: 1.5,
};

const BookmarkItem: React.FC<{ bookmark: BookmarkShort }> = ({ bookmark }) => {
  const { deleteBookmark } = useGlobalStore((s) => s.actions);
  return (
    <Group wrap="nowrap" align="start">
      <IconWorldWww stroke={1.5} />
      <Stack gap={'0'}>
        <Tooltip
          label={<MarkdownRender text={bookmark.snapshot} />}
          maw={800}
          mah={500}
          multiline
          openDelay={500}
          closeDelay={100}
        >
          <Anchor component={Link} to={bookmark.url} target="_blank">
            {bookmark.name}
          </Anchor>
        </Tooltip>
        <Tooltip label={bookmark.summary} w={400} multiline openDelay={500}>
          <Text c="gray" lineClamp={2} size="sm">
            {bookmark.summary}
          </Text>
        </Tooltip>
      </Stack>
      <FlexGrow />
      <ActionIcon.Group>
        <CopyButton value={bookmark.url} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy URL'}>
              <ActionIcon
                color={copied ? 'teal' : 'gray'}
                variant="default"
                onClick={copy}
              >
                {copied ? (
                  <IconCheck {...iconProps} />
                ) : (
                  <IconCopy {...iconProps} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
        <Tooltip label="Rename">
          <ActionIcon variant="default">
            <IconPencil
              {...iconProps}
              onClick={() => {
                openContextModal({
                  modal: 'RenameBookmarkModal',
                  title: 'Rename bookmark',
                  innerProps: {
                    id: bookmark.id,
                    initialName: bookmark.name,
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
                deleteBookmark(bookmark.id);
              }}
            />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
    </Group>
  );
};

export default BookmarkItem;
