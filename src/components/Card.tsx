import cn from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

function Card({ className, children, asChild, ...props }: CardProps) {
  const classes = cn("bg-fill-2 border-fill-1 rounded-sm border p-4 shadow-sm", className);
  return asChild ? (
    <Slot className={classes} {...props}>
      {children}
    </Slot>
  ) : (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Card;
