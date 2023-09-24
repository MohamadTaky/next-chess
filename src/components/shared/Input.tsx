import cn from "@/utils/cn";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-md border bg-fill-1 px-2 py-1 placeholder:text-sm placeholder:text-primary/50 md:px-3 md:py-1.5 md:placeholder:text-base",
        className,
      )}
      type="text"
      {...props}
    />
  );
}
