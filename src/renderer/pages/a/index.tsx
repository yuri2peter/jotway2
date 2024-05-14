import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { activityRegister } from 'src/renderer/activities/register';
import AppLayout from 'src/renderer/components/layouts/AppLayout';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';

const PageActivity: React.FC<{}> = () => {
  const { id = '' } = useParams();
  const { setActivity } = useGlobalStore((s) => s.actions);
  const activity = activityRegister[id];
  useEffect(() => {
    if (id) {
      setActivity(id);
    }
  }, [id, setActivity]);
  return (
    <>
      <AppLayout />
      <Helmet>{activity && <title>{activity.name}</title>}</Helmet>
    </>
  );
};

export default PageActivity;
