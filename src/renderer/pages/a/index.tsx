import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { activityRegister } from 'src/renderer/activities/register';
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
  return (
    <>
      <Helmet>{activity && <title>{activity.name}</title>}</Helmet>
    </>
  );
};

export default PageActivity;
