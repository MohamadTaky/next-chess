import { UUID } from "crypto";
import { StateCreator } from "zustand";
import ToastSlice from "./types";

const createToastSlice: StateCreator<ToastSlice> = (set) => ({
  toastMessages: [],
  addToastMessage: (message) =>
    set((prev) => ({ toastMessages: [...prev.toastMessages, { ...message, id: crypto.randomUUID() as UUID }] })),
  deleteToastMessage: (deletedMessageId) =>
    set((prev) => ({ toastMessages: prev.toastMessages.filter(({ id }) => id !== deletedMessageId) })),
});

export default createToastSlice;
