import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ConfigStore, createConfigSlice } from "./slices/config-slice";
import { FormStore, createFormSlice } from "./slices/form-slice";
import { HistoryStore, createHistorySlice } from "./slices/history-slice";
import { TaskStore, createTaskSlice } from "./slices/task-slice";

type AppStore = ConfigStore;
export const useAppStore = create<AppStore>()((...a) => ({
  ...createConfigSlice(...a),
}));

export const useFormStore = create<FormStore>()((...a) => ({
  ...createFormSlice(...a),
}));

export const useTaskStore = create<TaskStore>()((...a) => ({
  ...createTaskSlice(...a),
}));

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (...a) => ({
      ...createHistorySlice(...a),
    }),
    {
      name: "history-store",
    }
  )
);
