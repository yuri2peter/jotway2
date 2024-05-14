import React from 'react';
import { NavLink } from '@mantine/core';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { activityRegister } from 'src/renderer/activities/register';
import { Link } from 'react-router-dom';

const iconProps = {
  size: '1rem',
  stroke: 1.5,
};

const NavBar: React.FC<{}> = () => {
  const navMenu = useGlobalStore((s) => s.navMenu);
  return (
    <>
      {navMenu
        .filter((t) => t.parentId === '')
        .map((t) => (
          <NavItem key={t.id} id={t.id} />
        ))}
    </>
  );
};

const NavItem: React.FC<{ id: string }> = ({ id }) => {
  const { toogleNavMenu } = useGlobalStore((s) => s.actions);
  const navMenu = useGlobalStore((s) => s.navMenu);
  const navItem = navMenu.find((n) => n.id === id);
  const activity = activityRegister[id];
  if (!navItem || !activity) return null;
  const childrenItems = navMenu.filter((t) => t.parentId === id);
  const isMenu = !activity.renderer;
  const commonProps = {
    label: activity.name,
    leftSection: <activity.icon {...iconProps} />,
    opened: navItem.opened,
    childrenOffset: 28,
    active: navItem.active,
    children: childrenItems.length
      ? childrenItems.map((t) => <NavItem key={t.id} id={t.id} />)
      : null,
  };
  if (isMenu) {
    return (
      <NavLink
        {...commonProps}
        variant={'subtle'}
        onClick={() => {
          toogleNavMenu(id);
        }}
      ></NavLink>
    );
  }
  return <NavLink {...commonProps} component={Link} to={'/a/' + id}></NavLink>;
};

export default NavBar;
