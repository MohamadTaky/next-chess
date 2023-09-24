import cn from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { ForwardedRef, HTMLAttributes, forwardRef } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

function Card({ className, children, asChild, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>) {
  const classes = cn("bg-fill-2 border-fill-1 rounded-sm border p-2 shadow-sm", className);
  return asChild ? (
    <Slot ref={ref} className={classes} {...props}>
      {children}
    </Slot>
  ) : (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
}

export default forwardRef(Card);
