import { createSelector } from 'reselect';
import { createZustandStore } from 'src/common/libs/createZustand';
import { ActivityNavItems, navMenu } from './navMenu';
import { Dir, DirNavItem, DirSchema } from 'src/common/type/dir';
import { z } from 'zod';
import { api, apiErrorHandler } from '../helpers/api';
import { now } from 'lodash';
import { nanoid } from 'nanoid';
import { navigate } from '../hacks/navigate';
import { NoteShort } from 'src/common/type/note';
import { BookmarkShort } from 'src/common/type/bookmark';
import { autoRenameWithIndex } from 'src/common/utils/string';
import { openConfirmModal } from '@mantine/modals';
import { Text } from '@mantine/core';

interface Store {
  appReady: boolean;
  socketOnline: boolean;
  activityNavItems: ActivityNavItems;
  currentActivityId: string;
  currentDirId: string;
  dirNavItems: DirNavItem[];
  currentDirSubItems: {
    dirIds: string[];
    dirs: Dir[];
    noteShorts: NoteShort[];
    noteIds: string[];
    bookmarkShorts: BookmarkShort[];
    bookmarkIds: string[];
  };
}

const defaultStore: Store = {
  appReady: false,
  socketOnline: false,
  activityNavItems: navMenu,
  currentActivityId: '',
  currentDirId: '',
  dirNavItems: [],
  currentDirSubItems: {
    dirIds: [],
    dirs: [],
    noteShorts: [],
    noteIds: [],
    bookmarkShorts: [],
    bookmarkIds: [],
  },
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
          item.active = true;
          const subItems = d.dirNavItems.filter((t) => t.parentId === item.id);
          item.opened = subItems.length > 0;
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
  const fetchCurrentDirSubItems = async () => {
    try {
      const { data } = await api().post('/api/dir/get-sub-items', {
        id: get().currentDirId,
      });
      set((d) => {
        d.currentDirSubItems = data;
      });
    } catch (error) {
      return apiErrorHandler(error);
    }
  };
  const renameDir = async (id: string, name: string) => {
    try {
      set((d) => {
        const dir = d.dirNavItems.find((t) => t.id === id);
        if (dir) {
          dir.name = name;
        }
      });
      await api().post('/api/dir/rename', {
        id,
        name,
      });
    } catch (error) {
      return apiErrorHandler(error);
    }
  };
  const deleteDir = async (id: string) => {
    const dir = get().dirNavItems.find((t) => t.id === id);
    if (!dir) {
      return;
    }
    openConfirmModal({
      title: 'Delete folder',
      centered: true,
      children: (
        <Text c="gray">
          Are you sure you want to delete the folder{' '}
          <Text c="blue" component="span">
            "{dir.name}"
          </Text>
          ?
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onCancel: () => null,
      onConfirm: () => {
        api()
          .post('/api/dir/delete-item', {
            id,
          })
          .then(syncDirs)
          .catch(apiErrorHandler);
      },
    });
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
            const subItems = d.dirNavItems.filter(
              (t) => t.parentId === item.id
            );
            if (subItems.length) {
              item.opened = !item.opened;
            } else {
              item.opened = false;
            }
          }
        });
      },
      setCurrentActivityId,
      setCurrentDirId,
      syncDirs,
      syncApp,
      async createDir(parentId = '', autoRedirect = true) {
        const newDir: Dir = {
          id: nanoid(),
          name: autoRenameWithIndex(
            'Untitled',
            get().dirNavItems.map((t) => t.name)
          ),
          parentId,
          createdAt: now(),
        };
        try {
          await api().post('/api/dir/upsert-item', newDir);
          set((d) => {
            d.dirNavItems.unshift({
              ...newDir,
              opened: false,
              active: false,
            });
            autoRedirect && navigate(`/d/${newDir.id}`);
          });
        } catch (error) {
          return apiErrorHandler(error);
        }
      },
      fetchCurrentDirSubItems,
      renameDir,
      deleteDir,
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
