import { StateCreator } from "zustand";
import { ThemeSlice } from "./types";

const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  isDarkMode: true,
  setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
});

export default createThemeSlice;
