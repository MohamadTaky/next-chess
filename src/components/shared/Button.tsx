"use client";

import cn from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2Icon } from "lucide-react";

const buttonVariants = cva(
  "block rounded-md w-fit relative transition text-center text-sm md:text-base disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "text-white bg-black hover:bg-black/90 active:bg-black/80 disabled:opacity-50 disabled:bg-black",
        outline: "border-2 border-black/50 hover:bg-fill-1/80 active:bg-fill-1",
        ghost: "bg-transparent disabled:opacity-50",
      },
      shape: {
        rectangle: "px-2 py-1 md:px-3 md:py-1.5",
        squared: "p-1.5 md:p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "rectangle",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

function Button(
  { children, className, variant, shape, asChild, isLoading, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return asChild ? (
    <Slot ref={ref} className={cn(buttonVariants({ className, variant }))} {...props}>
      {children}
    </Slot>
  ) : (
    <button
      type="button"
      ref={ref}
      disabled={isLoading}
      className={cn(buttonVariants({ className, variant, shape }))}
      {...props}
    >
      {children}
      {isLoading && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center rounded-md bg-inherit">
          <Loader2Icon className="animate-spin" />
        </div>
      )}
    </button>
  );
}

export default forwardRef(Button);
