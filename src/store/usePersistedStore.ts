import { create } from "zustand";
import { persist } from "zustand/middleware";
import createPlayerSlice from "@/store/slice/player/createPlayerSlice";
import { PersistedStore } from "./types";

const usePersistedStore = create<PersistedStore>()(
  persist(
    (...a) => ({
      ...createPlayerSlice(...a),
    }),
    { name: "persistedStore" },
  ),
);

export default usePersistedStore;
