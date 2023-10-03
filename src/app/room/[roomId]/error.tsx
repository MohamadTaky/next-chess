"use client";

import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const { replace } = useRouter();
  const addToastMessage = useStore((store) => store.addToastMessage);
  useEffect(() => {
    addToastMessage({ text: error.message, type: "error" });
    replace("room");
  }, []);
  return <></>;
}
