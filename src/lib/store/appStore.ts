import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import store from "./";

const INITIAL_STATE = {
  uploadsHistory: [],
};

type AppStoreState = {
  uploadsHistory: App.UploadHistory[];
  addUploadHistory: (uploadHistory: App.UploadHistory) => void;
  deleteUploadHistory: (id: number) => void;
  clearUploadHistory: () => void;
};

const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      addUploadHistory: (uploadHistory: App.UploadHistory) =>
        set((state) => ({
          uploadsHistory: [...state.uploadsHistory, uploadHistory],
        })),
      deleteUploadHistory: (id) =>
        set((state) => ({
          uploadsHistory: state.uploadsHistory.filter(
            (upload) => upload.id !== id
          ),
        })),
      clearUploadHistory: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => store.persister),
    }
  )
);

export default useAppStore;
