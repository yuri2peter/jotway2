import React from 'react';
import { Button, Group, Textarea } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const RenameDirModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ id: string; initialName: string }>) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: innerProps.initialName,
    },
    validate: zodResolver(
      z.object({
        name: z.string().trim().min(1),
      })
    ),
  });
  const { renameDir } = useGlobalStore((s) => s.actions);
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        renameDir(innerProps.id, values.name);
        context.closeModal(id);
      })}
    >
      <Textarea
        placeholder=""
        label="New name"
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
export default RenameDirModal;
