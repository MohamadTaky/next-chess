import { create } from "zustand";
import { persist } from "zustand/middleware";
import createThemeSlice from "@/store/slice/theme/createThemeSlice";
import createPlayerSlice from "@/store/slice/player/createPlayerSlice";
import { PersistedStore } from "./types";

const usePersistedStore = create<PersistedStore>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createPlayerSlice(...a),
    }),
    { name: "persistedStore" },
  ),
);

export default usePersistedStore;
