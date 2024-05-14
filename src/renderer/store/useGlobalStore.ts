import { createZustandStore } from 'src/common/libs/createZustand';
import { NavMenu, navMenu } from './navMenu';

interface Store {
  navMenu: NavMenu;
  activity: {
    id: string;
    data?: any;
  };
}

const defaultStore: Store = {
  navMenu,
  activity: {
    id: 'jottings',
  },
};

export const useGlobalStore = createZustandStore(defaultStore, (set, get) => {
  return {
    actions: {
      toogleNavMenu(id: string) {
        set((d) => {
          const item = d.navMenu.find((t) => t.id === id);
          if (item) {
            item.opened = !item.opened;
          }
        });
      },
      setActivity(id: string, data?: any) {
        set((d) => {
          d.activity = {
            id,
            data,
          };
          const resetMenu = () => {
            d.navMenu.forEach((t) => {
              t.opened = false;
              t.active = false;
            });
          };
          const openRelativeMenu = (id: string) => {
            const item = d.navMenu.find((t) => t.id === id);
            if (item) {
              item.opened = true;
              item.active = true;
              openRelativeMenu(item.parentId);
            }
          };
          resetMenu();
          openRelativeMenu(id);
        });
      },
    },
  };
});
