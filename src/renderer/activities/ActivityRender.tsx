import React, { useMemo } from 'react';
import ActivityLayout from '../components/layouts/ActivityLayout';
import { activityRegister } from './register';
import { Stack, Breadcrumbs, Text, Group, Box, Portal } from '@mantine/core';
import { useGlobalStore } from '../store/useGlobalStore';

const elIdRightSide = 'activity-title-right-side';

const ActivityRender: React.FC = () => {
  const currentActivityId = useGlobalStore((s) => s.currentActivityId);
  const activity = activityRegister[currentActivityId];
  const navMenu = useGlobalStore((s) => s.activityNavItems);
  const relativeIds = useMemo(() => {
    const ergodicItem = (
      itemId: string,
      onFound: (id: string) => void
    ): void => {
      const item = navMenu.find((t) => t.id === itemId);
      if (item) onFound(item.id);
      if (item?.parentId) {
        ergodicItem(item.parentId, onFound);
      }
    };
    const ids: string[] = [];
    ergodicItem(currentActivityId, (id) => ids.push(id));
    return ids.reverse();
  }, [currentActivityId, navMenu]);
  if (!activity?.renderer) return null;
  return (
    <ActivityLayout
      maxWidth={600}
      header={
        <Stack gap={'xl'}>
          <Breadcrumbs>
            {relativeIds.map((cid) => (
              <Text key={cid} c={currentActivityId === cid ? 'dark' : 'gray'}>
                {activityRegister[cid]?.name}
              </Text>
            ))}
          </Breadcrumbs>
        </Stack>
      }
    >
      <Stack mb={'lg'}>
        <Group>
          <activity.icon size={32} />
          <Text size={'32px'}>{activity?.name}</Text>
          <Box id={elIdRightSide} ml={'auto'}></Box>
        </Group>
        <activity.renderer />
      </Stack>
    </ActivityLayout>
  );
};

export const ActvityTitleRightSideSlot: React.FC<{
  children: React.ReactNode;
}> = ({ children = null }) => {
  return <Portal target={'#' + elIdRightSide}>{children}</Portal>;
};

export default ActivityRender;
