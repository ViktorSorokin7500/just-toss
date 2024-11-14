import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn(className, "mx-auto px-2 max-w-[1280px]")}>
      {children}
    </div>
  );
};
