import { CloseButton, Group, Progress, Stack, Text } from '@mantine/core';
import React, { useCallback, useEffect, useRef } from 'react';
import { bytesToSize } from 'src/common/utils/string';
import FlexGrow from 'src/renderer/components/miscs/FlexGrow';
import { api, apiErrorHandler } from 'src/renderer/helpers/api';

const Uploader: React.FC<{
  file: File;
  onRemove: () => void;
  onFinish: () => void;
}> = ({ file, onRemove, onFinish }) => {
  const [progress, setProgress] = React.useState(0);
  const apiController = useRef(new AbortController());
  const abort = useCallback(() => {
    apiController.current.abort();
  }, []);
  useEffect(() => {
    (async () => {
      const formData = new FormData();
      formData.append('file', file);
      api()
        .post('/api/file-drop/upload', formData, {
          signal: apiController.current.signal,
          onUploadProgress: ({ loaded, total }) => {
            setProgress((loaded / (total || 1)) * 100);
          },
        })
        .then(() => {
          onRemove();
          onFinish();
        })
        .catch(apiErrorHandler);
    })();
    return abort;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stack gap={0}>
      <Group wrap="nowrap">
        <Text>{file.name}</Text>
        <FlexGrow />
        <Text c="gray">{bytesToSize(file.size)}</Text>
        <CloseButton
          onClick={() => {
            abort();
            onRemove();
          }}
        />
      </Group>
      <Progress
        value={progress}
        striped
        animated
        color="gray"
        size="sm"
        transitionDuration={200}
      />
    </Stack>
  );
};

export default Uploader;
