export type ThemeSliceStates = {
  isDarkMode: boolean;
};

export type ThemeSliceActions = {
  setIsDarkMode: (isDarkMode: boolean) => void;
};

export type ThemeSlice = ThemeSliceStates & ThemeSliceActions;
