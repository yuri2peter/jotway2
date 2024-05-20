import { Button, Group, Text, rem } from '@mantine/core';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { useRef } from 'react';
import { useMobile } from 'src/renderer/hooks/useMobile';

const UploadZone: React.FC<{ onDrop: (files: File[]) => void }> = ({
  onDrop,
}) => {
  const openRef = useRef<() => void>(null);
  const isMobile = useMobile();
  return (
    <>
      <Dropzone
        hidden={isMobile}
        openRef={openRef}
        onDrop={(files) => {
          onDrop(files as File[]);
        }}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={1024 * 1024 ** 2}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-gray-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline c="gray.8">
              Drag files here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 1gb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {isMobile && (
        <Button
          size="lg"
          fullWidth
          variant="default"
          onClick={() => openRef.current?.()}
          leftSection={<IconUpload />}
        >
          Upload Files (max 1gb)
        </Button>
      )}
    </>
  );
};

export default UploadZone;
