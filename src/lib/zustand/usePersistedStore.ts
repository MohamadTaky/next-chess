import { create } from "zustand";
import { persist } from "zustand/middleware";
import createThemeSlice from "@/app/(index)/slice/createThemeSlice";
import createPlayerSlice from "@/app/room/slice/createPlayerSlice";
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
