import { ArrayElement } from "@/utils/arrayElement";
import { UUID } from "crypto";

export type ToastSliceStates = {
  toastMessages: {
    type: "error" | "success";
    text: string;
    id: UUID;
  }[];
};

export type ToastSliceActions = {
  addToastMessage: (message: Omit<ArrayElement<ToastSliceStates["toastMessages"]>, "id">) => void;
  deleteToastMessage: (id: UUID) => void;
};

type ToastSlice = ToastSliceStates & ToastSliceActions;

export default ToastSlice;
