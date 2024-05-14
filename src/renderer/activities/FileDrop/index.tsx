import { Stack, Text } from '@mantine/core';
import React, { useCallback, useEffect } from 'react';
import UploadZone from './UploadZone';
import { useDebouncedCallback, useListState } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import Uploader from './Uploader';
import { api, apiErrorHandler } from 'src/renderer/helpers/api';
import { FileDropItem, FileDropItemSchema } from 'src/common/type/fileDrop';
import FileItem from './FileItem';
import { z } from 'zod';

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
        setItemList(z.array(FileDropItemSchema).parse(data));
      })
      .catch(apiErrorHandler);
  }, [setItemList]);
  const debouncedReloadList = useDebouncedCallback(reloadList, 500);
  useEffect(() => {
    reloadList();
  }, [reloadList]);
  return (
    <>
      <Text c={'gray'}>Upload, and share files across devices.</Text>
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
    </>
  );
};

export default FileDrop;
