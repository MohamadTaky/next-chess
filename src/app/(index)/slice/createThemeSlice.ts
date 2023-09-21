import { StateCreator } from "zustand";

export type ThemeSliceStates = {
  isDarkMode: boolean;
};

export type ThemeSliceActions = {
  setIsDarkMode: (isDarkMode: boolean) => void;
};

export type ThemeSlice = ThemeSliceStates & ThemeSliceActions;

const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  isDarkMode: true,
  setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
});

export default createThemeSlice;
