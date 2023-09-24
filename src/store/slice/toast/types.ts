import { ArrayElement } from "@/utils/arrayElement";


export type ToastSliceStates = {
  toastMessages: {
    type: "error" | "success";
    text: string;
    id: string;
  }[];
};

export type ToastSliceActions = {
  addToastMessage: (message: Omit<ArrayElement<ToastSliceStates["toastMessages"]>, "id">) => void;
  deleteToastMessage: (id: string) => void;
};

type ToastSlice = ToastSliceStates & ToastSliceActions;

export default ToastSlice;
