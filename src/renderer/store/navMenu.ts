export type NavMenu = {
  id: string;
  parentId: string;
  opened: boolean;
  active: boolean;
}[];

export const navMenu: NavMenu = [
  {
    id: 'tools',
    parentId: '',
    opened: true,
    active: false,
  },
  {
    id: 'jottings',
    parentId: 'tools',
    opened: false,
    active: false,
  },
  {
    id: 'todo',
    parentId: 'tools',
    opened: false,
    active: false,
  },
  {
    id: 'fileDrop',
    parentId: 'tools',
    opened: false,
    active: false,
  },
  {
    id: 'ai',
    parentId: '',
    opened: false,
    active: false,
  },
  {
    id: 'system',
    parentId: '',
    opened: false,
    active: false,
  },
  {
    id: 'settings',
    parentId: 'system',
    opened: false,
    active: false,
  },
];
