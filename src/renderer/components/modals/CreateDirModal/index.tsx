import React from 'react';
import { Button, Group, Textarea } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const CreateDirModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ parentId: string; autoRedirect: boolean }>) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
    },
    validate: zodResolver(
      z.object({
        name: z.string().trim().min(1),
      })
    ),
  });
  const { createDir } = useGlobalStore((s) => s.actions);
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        createDir({
          parentId: innerProps.parentId,
          name: values.name,
          autoRedirect: innerProps.autoRedirect,
        });
        context.closeModal(id);
      })}
    >
      <Textarea
        placeholder=""
        label="Folder name"
        data-autofocus
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
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
export default CreateDirModal;
