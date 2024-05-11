import { createZustandStore } from 'src/common/libs/createZustand';

interface Store {
  activity: {
    type: string;
    data?: any;
  };
}

const defaultStore: Store = {
  activity: {
    type: 'fileDrop',
  },
};

export const useGlobalStore = createZustandStore(defaultStore, (set, get) => {
  return {
    actions: {
      setActivity(type: string, data?: any) {
        set((d) => {
          d.activity = {
            type,
            data,
          };
        });
      },
    },
  };
});
