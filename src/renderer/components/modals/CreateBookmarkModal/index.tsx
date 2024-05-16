import React from 'react';
import { Button, Group, Text, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';

const CreateBookmarkModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ parentId: string }>) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      url: '',
    },
    validate: zodResolver(
      z.object({
        url: z.string().url(),
      })
    ),
  });
  const { createBookmark } = useGlobalStore((s) => s.actions);
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        createBookmark(values.url, innerProps.parentId);
        context.closeModal(id);
      })}
    >
      <TextInput
        placeholder="https://foo.bar"
        label="URL"
        data-autofocus
        key={form.key('url')}
        {...form.getInputProps('url')}
      />
      <Text c="gray" size="sm">
        The URL will be analyzed and parsed automatically with internal AI
        engine.
      </Text>
      <Group mt="lg">
        <Button
          variant="outline"
          color="gray"
          ml="auto"
          onClick={async () => {
            context.closeModal(id);
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
export default CreateBookmarkModal;
