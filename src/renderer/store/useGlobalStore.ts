import { createSelector } from 'reselect';
import { createZustandStore } from 'src/common/libs/createZustand';
import { ActivityNavItems, navMenu } from './navMenu';
import { Dir, DirNavItem, DirSchema } from 'src/common/type/dir';
import { z } from 'zod';
import { api, apiErrorHandler } from '../helpers/api';
import { now } from 'lodash';
import { nanoid } from 'nanoid';
import { navigate } from '../hacks/navigate';

interface Store {
  appReady: boolean;
  socketOnline: boolean;
  activityNavItems: ActivityNavItems;
  currentActivityId: string;
  currentDirId: string;
  dirNavItems: DirNavItem[];
}

const defaultStore: Store = {
  appReady: false,
  socketOnline: false,
  activityNavItems: navMenu,
  currentActivityId: '',
  currentDirId: '',
  dirNavItems: [],
};

export const useGlobalStore = createZustandStore(defaultStore, (set, get) => {
  const resetActivity = () => {
    set((d) => {
      d.activityNavItems.forEach((t) => {
        d.currentActivityId = '';
        t.opened = false;
        t.active = false;
      });
    });
  };
  const setCurrentActivityId = (id: string) => {
    resetActivity();
    resetDir();
    set((d) => {
      d.currentActivityId = id;
      const openRelativeMenu = (id: string) => {
        const item = d.activityNavItems.find((t) => t.id === id);
        if (item) {
          item.opened = true;
          item.active = true;
          openRelativeMenu(item.parentId);
        }
      };
      openRelativeMenu(id);
    });
  };
  const resetDir = () => {
    set((d) => {
      d.currentDirId = '';
      d.dirNavItems.forEach((t) => {
        t.opened = false;
        t.active = false;
      });
    });
  };
  const setCurrentDirId = (id: string) => {
    resetActivity();
    resetDir();
    set((d) => {
      d.currentDirId = id;
      const openRelativeMenu = (id: string) => {
        const item = d.dirNavItems.find((t) => t.id === id);
        if (item) {
          item.opened = true;
          item.active = true;
          openRelativeMenu(item.parentId);
        }
      };
      openRelativeMenu(id);
    });
  };
  const setAppReady = (ready: boolean) => {
    set((d) => {
      d.appReady = ready;
    });
  };
  const syncDirs = async () => {
    try {
      const { data } = await api().post('/api/dir/get-list');
      const dirs = z.array(DirSchema).parse(data);
      set((d) => {
        const prevItems = d.dirNavItems;
        d.dirNavItems = dirs.map((t) => {
          const prevItem = prevItems.find((item) => item.id === t.id);
          return {
            ...t,
            opened: prevItem ? prevItem.opened : false,
            active: prevItem ? prevItem.active : false,
          };
        });
      });
    } catch (error) {
      return apiErrorHandler(error);
    }
  };
  const syncApp = async () => {
    await Promise.all([syncDirs()]);
    setAppReady(true);
  };
  return {
    actions: {
      setSocketOnline(online: boolean) {
        set((d) => {
          d.socketOnline = online;
        });
      },
      toogleActivityNavItem(id: string) {
        set((d) => {
          const item = d.activityNavItems.find((t) => t.id === id);
          if (item) {
            item.opened = !item.opened;
          }
        });
      },
      toogleDirNavItem(id: string) {
        set((d) => {
          const item = d.dirNavItems.find((t) => t.id === id);
          if (item) {
            item.opened = !item.opened;
          }
        });
      },
      setCurrentActivityId,
      setCurrentDirId,
      syncDirs,
      syncApp,
      createDir(parentId = '') {
        const newDir: Dir = {
          id: nanoid(),
          name: 'Untitled',
          parentId,
          updatedAt: now(),
        };
        api()
          .post('/api/dir/upsert-item', newDir)
          .then(() => {
            set((d) => {
              d.dirNavItems.unshift({
                ...newDir,
                opened: false,
                active: false,
              });
              navigate(`/d/${newDir.id}`);
            });
          })
          .catch(apiErrorHandler);
      },
    },
  };
});

const selectDirs = (s: Store) => s.dirNavItems;
const selectCurrentDirId = (s: Store) => s.currentDirId;
export const selectCurrentDir = createSelector(
  [selectDirs, selectCurrentDirId],
  (dirs, currentDirId) => {
    return dirs.find((t) => t.id === currentDirId);
  }
);
export const selectRelativeDirs = createSelector(
  [selectDirs, selectCurrentDirId],
  (dirs, currentDirId) => {
    const ergodicItem = (
      itemId: string,
      onFound: (dir: DirNavItem) => void
    ): void => {
      const item = dirs.find((t) => t.id === itemId);
      if (item) onFound(item);
      if (item?.parentId) {
        ergodicItem(item.parentId, onFound);
      }
    };
    const relativeDirs: DirNavItem[] = [];
    ergodicItem(currentDirId, (item) => {
      relativeDirs.unshift(item);
    });
    return relativeDirs;
  }
);
