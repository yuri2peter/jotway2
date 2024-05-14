import React from 'react';
import { Button, NavLink } from '@mantine/core';
import { useGlobalStore } from 'src/renderer/store/useGlobalStore';
import { Link } from 'react-router-dom';
import { IconFolder, IconPlus } from '@tabler/icons-react';
import { iconProps } from './defines';

const DirNav: React.FC<{}> = () => {
  const dirNavItems = useGlobalStore((s) => s.dirNavItems);
  const { createDir } = useGlobalStore((s) => s.actions);
  return (
    <>
      <NavLink
        label="New Folder"
        leftSection={<IconPlus {...iconProps} />}
        onClick={() => {
          createDir();
        }}
      ></NavLink>
      {dirNavItems
        .filter((t) => t.parentId === '')
        .map((t) => (
          <DirNavItem key={t.id} id={t.id} />
        ))}
    </>
  );
};

const DirNavItem: React.FC<{ id: string }> = ({ id }) => {
  const currentDirId = useGlobalStore((s) => s.currentDirId);
  const { toogleDirNavItem } = useGlobalStore((s) => s.actions);
  const navMenu = useGlobalStore((s) => s.dirNavItems);
  const navItem = navMenu.find((n) => n.id === id);
  if (!navItem) return null;
  const childrenItems = navMenu.filter((t) => t.parentId === id);
  const itemProps = {
    label: navItem.name,
    leftSection: <IconFolder {...iconProps} />,
    opened: navItem.opened,
    childrenOffset: 28,
    active: navItem.active,
    children: childrenItems.length
      ? childrenItems.map((t) => <DirNavItem key={t.id} id={t.id} />)
      : null,
  };
  return (
    <NavLink
      {...itemProps}
      component={Link}
      to={'/d/' + id}
      variant={id === currentDirId ? undefined : 'subtle'}
      onClick={() => {
        toogleDirNavItem(id);
      }}
    ></NavLink>
  );
};

export default DirNav;
