import { CloseButton, Group, Progress, Stack, Text } from '@mantine/core';
import React from 'react';
import { bytesToSize } from 'src/common/utils/string';
import FlexGrow from 'src/renderer/components/miscs/FlexGrow';
import { UploadTaskState, uploadManager } from './store';
import { IconUpload } from '@tabler/icons-react';

const UploadTaskStateDisplay: React.FC<UploadTaskState> = ({
  id,
  fileName,
  fileSize,
  progress,
}) => {
  return (
    <Stack gap={0}>
      <Group wrap="nowrap">
        <Text c={'orange'}>
          <IconUpload stroke={1.5} size={20} style={{ marginRight: 4 }} />
          {fileName}
        </Text>
        <FlexGrow />
        <Text c="gray">{bytesToSize(fileSize)}</Text>
        <CloseButton
          onClick={() => {
            uploadManager.abortTask(id);
          }}
        />
      </Group>
      <Progress
        value={progress}
        striped
        animated
        color="orange"
        size="sm"
        transitionDuration={200}
      />
    </Stack>
  );
};

export default UploadTaskStateDisplay;
