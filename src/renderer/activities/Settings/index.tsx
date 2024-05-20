import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { SettingsSchema } from 'src/common/type/settings';
import { api, apiErrorHandler } from 'src/renderer/helpers/api';
import { notifications } from '@mantine/notifications';
import { IconStethoscope } from '@tabler/icons-react';

const Settings: React.FC<{}> = () => {
  const [loading, setLoading] = useState(true);
  const [checking1, setChecking1] = useState(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: SettingsSchema.parse({}),
    validate: zodResolver(SettingsSchema),
  });
  const { setValues } = form;
  useEffect(() => {
    api()
      .post('/api/settings/get')
      .then(({ data }) => {
        setValues(data);
        setLoading(false);
      })
      .catch(apiErrorHandler);
  }, [setValues]);
  return (
    <>
      <LoadingOverlay visible={loading} />
      <Text c={'gray'}>Configrations and customizations.</Text>
      <form
        onSubmit={form.onSubmit(async (values) => {
          api()
            .post('/api/settings/set', values)
            .then(() => {
              notifications.show({
                message: 'Settings updated.',
                color: 'green',
              });
            })
            .catch(apiErrorHandler);
        })}
      >
        <Stack gap={'lg'}>
          <TextInput
            required
            type="password"
            placeholder=""
            label="Gemini AI Key"
            description={
              <>
                The key could be applied here:{' '}
                <Anchor
                  href="https://makersuite.google.com/app/apikey"
                  c="blue"
                  underline="hover"
                  style={{
                    fontSize: 'inherit',
                  }}
                >
                  https://makersuite.google.com/app/apikey
                </Anchor>
              </>
            }
            rightSection={
              <Tooltip label="Check availability">
                <ActionIcon
                  variant="subtle"
                  loading={checking1}
                  onClick={() => {
                    setChecking1(true);
                    api()
                      .post('/api/settings/check-ai-key', {
                        key: form.getValues().geminiKey,
                      })
                      .then(({ data: { ok, error } }) => {
                        if (ok) {
                          notifications.show({
                            message: 'Gemini AI Key available.',
                            color: 'green',
                          });
                        } else {
                          notifications.show({
                            message: error,
                            color: 'red',
                            autoClose: false,
                          });
                        }
                      })
                      .catch(apiErrorHandler)
                      .finally(() => {
                        setChecking1(false);
                      });
                  }}
                >
                  <IconStethoscope size={16} />
                </ActionIcon>
              </Tooltip>
            }
            key={form.key('geminiKey')}
            {...form.getInputProps('geminiKey')}
          />
          <Stack gap={'sm'}>
            <Textarea
              required
              placeholder=""
              description={
                <>
                  The prompt used for bookmark analysis, adjust it to get a
                  better results.
                  <br />
                  e.g., "Summarize this webpage in two sentence based on the
                  following information and screenshots."
                </>
              }
              label="Bookmark Analysis Task Prompt"
              key={form.key('bookmarkAnalysisTaskPrompt')}
              {...form.getInputProps('bookmarkAnalysisTaskPrompt')}
            />
          </Stack>
        </Stack>
        <Group mt="xl">
          <Button type="submit">Submit</Button>
          <Button variant="outline" color="gray" onClick={async () => {}}>
            Cancel
          </Button>
        </Group>
      </form>
    </>
  );
};

export default Settings;
