import { Stack, Text } from '@mantine/core';
import React, { useEffect } from 'react';
import UploadZone from './UploadZone';
import UploadTaskStateDisplay from './UploadTaskStateDisplay';
import FileItem from './FileItem';
import { uploadManager, useFileDropStore } from './store';

const FileDrop: React.FC<{}> = () => {
  const items = useFileDropStore((s) => s.items);
  const uploadTasks = useFileDropStore((s) => s.uploadTasks);
  const { getList } = useFileDropStore((s) => s.actions);
  useEffect(() => {
    getList();
  }, [getList]);
  return (
    <>
      <Text c={'gray'}>Upload, and share files across devices.</Text>
      <UploadZone
        onDrop={(files) => {
          files.forEach((t) => uploadManager.addTask(t));
        }}
      />
      <Stack>
        {uploadTasks.map((t) => (
          <UploadTaskStateDisplay key={t.id} {...t} />
        ))}
      </Stack>
      <Stack gap={'xs'}>
        {items.map((t) => (
          <FileItem key={t.newFilename} item={t} />
        ))}
      </Stack>
    </>
  );
};

export default FileDrop;
