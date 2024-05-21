import { notifications } from '@mantine/notifications';
import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import { createZustandStore } from 'src/common/libs/createZustand';
import { FileDropItem, FileDropItemSchema } from 'src/common/type/fileDrop';
import { api, apiErrorHandler } from 'src/renderer/helpers/api';
import { z } from 'zod';

export interface UploadTaskState {
  id: string;
  fileName: string;
  fileSize: number;
  progress: number;
}
interface FileDropStore {
  loading: boolean;
  uploadTasks: UploadTaskState[];
  items: FileDropItem[];
}

const defaultStore: FileDropStore = {
  uploadTasks: [],
  items: [],
  loading: false,
};

export const useFileDropStore = createZustandStore(defaultStore, (set, get) => {
  const getList = async () => {
    set({ loading: true });
    await api()
      .post('/api/file-drop/get-list')
      .then(({ data }) => {
        const items = z.array(FileDropItemSchema).parse(data);
        set({ items });
      })
      .catch(apiErrorHandler);
    set({ loading: false });
  };
  const getListDebounced = debounce(getList, 500);
  const createUploadTask = (data: UploadTaskState) => {
    set((d) => {
      d.uploadTasks.unshift(data);
    });
  };
  const updateUploadTask = (id: string, data: Partial<UploadTaskState>) => {
    set((d) => {
      const task = d.uploadTasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, data);
      }
    });
  };
  const removeUploadTask = (id: string) => {
    set((d) => {
      d.uploadTasks = d.uploadTasks.filter((t) => t.id !== id);
    });
  };
  const deleteItem = async (newFilename: string) => {
    set((d) => {
      d.items = d.items.filter((t) => t.newFilename !== newFilename);
    });
    await api()
      .post('/api/file-drop/delete-item', {
        newFilename,
      })
      .catch(apiErrorHandler);
  };
  return {
    actions: {
      getList,
      getListDebounced,
      updateUploadTask,
      removeUploadTask,
      deleteItem,
      createUploadTask,
    },
  };
});

class UploadManager {
  tasks: {
    id: string;
    handleAbort: () => void;
  }[] = [];

  addTask(file: File) {
    const id = nanoid();
    useFileDropStore.getState().actions.createUploadTask({
      id,
      fileName: file.name,
      fileSize: file.size,
      progress: 0,
    });
    const abortCtrl = new AbortController();
    const formData = new FormData();
    formData.append('file', file);
    api()
      .post('/api/file-drop/upload', formData, {
        signal: abortCtrl.signal,
        onUploadProgress: ({ loaded, total }) => {
          const progress = (loaded / (total || 1)) * 100;
          useFileDropStore.getState().actions.updateUploadTask(id, {
            progress,
          });
        },
      })
      .then(() => {
        useFileDropStore.getState().actions.getListDebounced();
      })
      .catch(() => {
        notifications.show({
          color: 'red',
          title: 'Api Error',
          message: 'Upload faild or canceled',
        });
      })
      .finally(() => {
        useFileDropStore.getState().actions.removeUploadTask(id);
      });
    this.tasks.push({
      id,
      handleAbort: () => {
        abortCtrl.abort();
      },
    });
  }

  abortTask(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.handleAbort();
    }
  }
}

export const uploadManager = new UploadManager();
