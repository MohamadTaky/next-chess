"use client";

import cn from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2Icon } from "lucide-react";

const buttonVariants = cva(
  "block rounded-md px-2 py-1 md:px-3 md:py-1.5 w-fit relative transition text-center disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "text-white bg-black hover:bg-black/90 active:bg-black/80 !disabled:bg-black/70 disabled:opacity-50",
        outline: "border-2 border-black/50 hover:bg-fill-1/80 active:bg-fill-1",
        ghost: "bg-transparent disabled:opacity-50",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

function Button(
  { children, className, variant, asChild, isLoading, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return asChild ? (
    <Slot ref={ref} className={cn(buttonVariants({ className, variant }))} {...props}>
      {children}
    </Slot>
  ) : (
    <button ref={ref} className={cn(buttonVariants({ className, variant }))} {...props}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 grid place-items-center rounded-md bg-inherit">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </button>
  );
}

export default forwardRef(Button);
