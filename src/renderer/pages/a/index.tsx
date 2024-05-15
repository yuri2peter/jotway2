import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ActivityRender from 'src/renderer/activities/ActivityRender';
import { activityRegister } from 'src/renderer/activities/register';
import NoItem from 'src/renderer/components/miscs/NoItem';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';

const PageActivity: React.FC<{}> = () => {
  const { id = '' } = useParams();
  const { setCurrentActivityId } = useGlobalStore((s) => s.actions);
  const activity = activityRegister[id];
  useEffect(() => {
    if (id) {
      setCurrentActivityId(id);
    }
  }, [id, setCurrentActivityId]);
  if (!activity) {
    return <NoItem />;
  }
  return <ActivityRender />;
};

export default PageActivity;
