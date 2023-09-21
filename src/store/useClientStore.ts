import usePersistedStore from "@/store/usePersistedStore";
import { useEffect, useState } from "react";
import { PersistedStates } from "./types";

const useClientStore = <T>(selector: (store: PersistedStates) => T) => {
  const storeState = usePersistedStore(selector) as T;
  const [state, setState] = useState<T>();

  useEffect(() => {
    setState(storeState);
  }, [storeState]);

  return state;
};

export default useClientStore;
