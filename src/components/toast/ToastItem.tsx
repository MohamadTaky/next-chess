import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { ToastSliceStates } from "@/store/slice/toast/types";
import useStore from "@/store/useStore";
import { ArrayElement } from "@/utils/arrayElement";
import cn from "@/utils/cn";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { AlertCircleIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

type ToastItemProps = ArrayElement<ToastSliceStates["toastMessages"]> & {
  duration?: number;
};

const toastItemVariants = cva("relative items-center", {
  variants: {
    type: {
      error: "text-red-500",
      success: "text-green-500",
    },
  },
  defaultVariants: { type: "error" },
});

export default function ToastItem({ text, type, id, duration = 5000 }: ToastItemProps) {
  const deleteToastMessage = useStore((store) => store.deleteToastMessage);
  const handleDelete = () => deleteToastMessage(id);
  useEffect(() => {
    let timeoutId = setTimeout(handleDelete, duration);
    return () => clearTimeout(timeoutId);
  }, [duration]);

  return (
    <Card key={id} asChild>
      <motion.li
        transition={{ ease: "easeInOut" }}
        initial={{ translateX: "100%", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: "100%", opacity: 0 }}
        className={cn(toastItemVariants({ type }))}
      >
        <Button onClick={handleDelete} variant="ghost" shape="squared" className="absolute right-0 top-0 text-primary">
          <XIcon className="opacity-50" size="16" />
        </Button>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 pb-2">
          <AlertCircleIcon className="row-span-2" size="36" />
          <h2 className="font-bold capitalize text-current">{type}</h2>
          <p className="text-sm text-primary">{text}</p>
        </div>
        <motion.div
          transition={{ ease: "linear", duration: duration / 1000 }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          className="absolute bottom-0 left-0 h-1 w-full origin-left bg-current"
        />
      </motion.li>
    </Card>
  );
}
