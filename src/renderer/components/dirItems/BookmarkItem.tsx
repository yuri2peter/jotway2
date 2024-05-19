import {
  ActionIcon,
  Anchor,
  Group,
  Stack,
  Tooltip,
  Text,
  CopyButton,
  Menu,
  Image,
  AspectRatio,
} from '@mantine/core';
import {
  IconWorldWww,
  IconPencil,
  IconTrash,
  IconCopy,
  IconDotsVertical,
  IconRobot,
} from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import FlexGrow from '../miscs/FlexGrow';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { BookmarkShort } from 'src/common/type/bookmark';
import { openContextModal } from '@mantine/modals';
// import MarkdownRender from '../MarkdownRender';
import { notifications } from '@mantine/notifications';

const iconProps = {
  color: 'gray',
  stroke: 1.5,
};

const BookmarkItem: React.FC<{ bookmark: BookmarkShort }> = ({ bookmark }) => {
  const { deleteBookmark, analysisBookmark } = useGlobalStore((s) => s.actions);
  return (
    <Group wrap="nowrap" align="start">
      <IconWorldWww stroke={1.5} />
      <Stack gap={'0'}>
        <Tooltip
          // label={<MarkdownRender text={bookmark.snapshot} />}
          label={
            bookmark.screenshot ? (
              <AspectRatio ratio={1440 / 900} maw={1440 / 2} w={'100vw'}>
                <Image src={bookmark.screenshot} alt="screenshot" />
              </AspectRatio>
            ) : (
              bookmark.url
            )
          }
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
      <Menu shadow="md" width={200} trigger="click-hover">
        <Menu.Target>
          <ActionIcon variant="subtle">
            <IconDotsVertical {...iconProps} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <CopyButton value={bookmark.url} timeout={2000}>
            {({ copy }) => (
              <Menu.Item
                leftSection={<IconCopy {...iconProps} />}
                onClick={() => {
                  copy();
                  notifications.show({
                    color: 'green',
                    title: 'Copied to clipboard',
                    message: bookmark.url,
                  });
                }}
              >
                Copy URL
              </Menu.Item>
            )}
          </CopyButton>
          <Menu.Item
            leftSection={<IconPencil {...iconProps} />}
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
          >
            Rename
          </Menu.Item>
          <Menu.Item
            leftSection={<IconRobot {...iconProps} />}
            onClick={() => {
              analysisBookmark(bookmark.id);
            }}
          >
            Analyze
          </Menu.Item>
          <Menu.Item
            leftSection={<IconTrash {...iconProps} />}
            onClick={() => {
              deleteBookmark(bookmark.id);
            }}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default BookmarkItem;
