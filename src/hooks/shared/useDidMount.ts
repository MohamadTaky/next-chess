import { useEffect, useRef } from "react";

export default function useDidMount() {
  const didMountRef = useRef(false);
  useEffect(() => {
    didMountRef.current = true;
    return () => {
      didMountRef.current = false;
    };
  }, []);
  return didMountRef.current;
}
