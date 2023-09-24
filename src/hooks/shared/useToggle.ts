import { useState } from "react";

export default function useToggle(inititalValue: boolean): [boolean, () => void] {
  const [state, setState] = useState(inititalValue);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
}
