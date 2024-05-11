import { Stack, Textarea } from '@mantine/core';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { api, apiErrorHandler } from 'src/renderer/helpers/api';

const Editor: React.FC<{}> = () => {
  const [value, setValue] = useState('');
  useEffect(() => {
    api()
      .post('/api/jottings/get')
      .then(({ data: { text } }) => {
        setValue(text as string);
      })
      .catch(apiErrorHandler);
  }, [setValue]);
  const saveText = useMemo(() => {
    return debounce((text: string) => {
      api().post('/api/jottings/set', { text }).catch(apiErrorHandler);
    }, 500);
  }, []);
  return (
    <Stack>
      <Textarea
        value={value}
        onChange={(e) => {
          const text = e.target.value;
          setValue(text);
          saveText(text);
        }}
        placeholder="Ideas, notes, thoughts..."
        autosize
        minRows={8}
        maxRows={40}
      />
    </Stack>
  );
};

export default Editor;
