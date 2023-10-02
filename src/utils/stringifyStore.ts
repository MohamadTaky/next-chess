import { StoreStates } from "@/store/types";

export default function stringifyStore(store: StoreStates) {
  return JSON.stringify(store, replacer);
}

function replacer(key: string, value: unknown) {
  if (key === "toastMessages" || key === "members" || value instanceof Function) return undefined;
  if (value instanceof Map) return Object.fromEntries(value);
  return value;
}
