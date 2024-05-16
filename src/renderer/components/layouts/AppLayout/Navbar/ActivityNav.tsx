import React from 'react';
import { NavLink } from '@mantine/core';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { activityRegister } from 'src/renderer/activities/register';
import { Link } from 'react-router-dom';
import { iconProps } from './defines';

const ActivityNav: React.FC<{}> = () => {
  const activityNavItems = useGlobalStore((s) => s.activityNavItems);
  return (
    <>
      {activityNavItems
        .filter((t) => t.parentId === '')
        .map((t) => (
          <ActivityNavItem key={t.id} id={t.id} />
        ))}
    </>
  );
};

const ActivityNavItem: React.FC<{ id: string }> = ({ id }) => {
  const { toogleActivityNavItem } = useGlobalStore((s) => s.actions);
  const navMenu = useGlobalStore((s) => s.activityNavItems);
  const navItem = navMenu.find((n) => n.id === id);
  const activity = activityRegister[id];
  if (!navItem || !activity) return null;
  const childrenItems = navMenu.filter((t) => t.parentId === id);
  const isMenu = !activity.renderer;
  const commonProps = {
    label: activity.name,
    leftSection: <activity.icon {...iconProps} />,
    opened: navItem.opened,
    childrenOffset: 16,
    active: navItem.active,
    children: childrenItems.length
      ? childrenItems.map((t) => <ActivityNavItem key={t.id} id={t.id} />)
      : null,
  };
  if (isMenu) {
    return (
      <NavLink
        {...commonProps}
        variant={'subtle'}
        onClick={() => {
          toogleActivityNavItem(id);
        }}
      ></NavLink>
    );
  }
  return <NavLink {...commonProps} component={Link} to={'/a/' + id}></NavLink>;
};
export default ActivityNav;
