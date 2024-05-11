import { Stack, Breadcrumbs, Group, Text } from '@mantine/core';
import { IconFile } from '@tabler/icons-react';
import React, { useCallback, useEffect } from 'react';
import ActivityLayout from 'src/renderer/components/layouts/ActivityLayout';
import FlexGrow from 'src/renderer/components/miscs/FlexGrow';
import UploadZone from './UploadZone';
import { useDebouncedCallback, useListState } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import Uploader from './Uploader';
import { api, apiErrorHandler } from 'src/renderer/helpers/api';
import { FileDropItem } from 'src/common/type/fileDrop';
import FileItem from './FileItem';

const FileDrop: React.FC<{}> = () => {
  const [uploadList, uploadListHandlers] = useListState<{
    id: string;
    file: File;
  }>([]);
  const [itemList, { setState: setItemList, filter: filterItemList }] =
    useListState<FileDropItem>([]);
  const reloadList = useCallback(() => {
    api()
      .post('/api/file-drop/get-list')
      .then(({ data }) => {
        setItemList(data);
      })
      .catch(apiErrorHandler);
  }, [setItemList]);
  const debouncedReloadList = useDebouncedCallback(reloadList, 500);
  useEffect(() => {
    reloadList();
  }, [reloadList]);
  return (
    <ActivityLayout
      maxWidth={600}
      header={
        <Stack gap={'xl'}>
          <Breadcrumbs>
            <Text c="gray">Tools</Text>
            <Text>File Drop</Text>
          </Breadcrumbs>
        </Stack>
      }
    >
      <Stack gap={'lg'}>
        <Stack>
          <Group>
            <IconFile size={32} />
            <Text size={'32px'}>File Drop</Text>
            <FlexGrow />
          </Group>
          <Text c={'gray'}>Upload, and share files across devices.</Text>
        </Stack>
        <UploadZone
          onDrop={(files) => {
            uploadListHandlers.prepend(
              ...files.map((file) => ({ id: nanoid(), file }))
            );
          }}
        />
        <Stack>
          {uploadList.map((t) => (
            <Uploader
              key={t.id}
              file={t.file}
              onRemove={() => {
                uploadListHandlers.filter((item) => item.id !== t.id);
              }}
              onFinish={() => {
                uploadListHandlers.filter((item) => item.id !== t.id);
                debouncedReloadList();
              }}
            />
          ))}
        </Stack>
        <Stack>
          {itemList.map((t) => (
            <FileItem
              key={t.newFilename}
              item={t}
              onDelete={() => {
                api()
                  .post('/api/file-drop/delete-item', {
                    newFilename: t.newFilename,
                  })
                  .catch(apiErrorHandler);
                filterItemList((item) => item.newFilename !== t.newFilename);
              }}
            />
          ))}
        </Stack>
      </Stack>
    </ActivityLayout>
  );
};

export default FileDrop;
