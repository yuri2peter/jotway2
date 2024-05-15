import React from 'react';
import {
  selectCurrentDir,
  useGlobalStore,
  selectRelativeDirs,
} from 'src/renderer/store/useGlobalStore';
import ActivityLayout from '../layouts/ActivityLayout';
import { Anchor, Breadcrumbs, Group, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconFolder } from '@tabler/icons-react';
import ActionMenu from './ActionMenu';
import FlexGrow from '../miscs/FlexGrow';
import { Helmet } from 'react-helmet';

const DirRender: React.FC = () => {
  const currentItem = useGlobalStore(selectCurrentDir);
  const relativeDirs = useGlobalStore(selectRelativeDirs);
  if (!currentItem) {
    return null;
  }
  return (
    <>
      <Helmet>
        <title>{currentItem.name}</title>
      </Helmet>
      <ActivityLayout
        maxWidth={600}
        header={
          <Breadcrumbs>
            <></>
            {relativeDirs.map((t) => (
              <Anchor key={t.id} to={`/d/${t.id}`} component={Link} c="blue">
                {t.name}
              </Anchor>
            ))}
          </Breadcrumbs>
        }
      >
        <Stack mb={'lg'}>
          <Group>
            <IconFolder size={32} />
            <Text size={'32px'}>{currentItem.name}</Text>
            <FlexGrow />
            <ActionMenu />
          </Group>
        </Stack>
      </ActivityLayout>
    </>
  );
};

export default DirRender;
