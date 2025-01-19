"use client";

import { Toaster as Sonner } from "sonner";
import { cn } from "../../../../lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  containerClassName?: string;
  toastClassName?: string;
  descriptionClassName?: string;
  actionButtonClassName?: string;
  cancelButtonClassName?: string;
};

const Toaster = ({
  containerClassName,
  toastClassName,
  descriptionClassName,
  actionButtonClassName,
  cancelButtonClassName,
  ...props
}: ToasterProps) => {
  return (
    <Sonner
      className={cn("toaster group", containerClassName)}
      toastOptions={{
        classNames: {
          toast: cn("group toast ", toastClassName),
          description: cn(
            "group-[.toast]:text-muted-foreground",
            descriptionClassName,
          ),
          actionButton: cn("group-[.toast]:bg-primary", actionButtonClassName),
          cancelButton: cn(
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            cancelButtonClassName,
          ),
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
