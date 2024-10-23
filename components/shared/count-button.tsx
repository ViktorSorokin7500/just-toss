import React from "react";
import { cn } from "@/lib/utils";
import { CountButtonIcon } from "./count-button-icon";

export interface CountButtonProps {
  value?: number;
  size: "sm" | "lg";
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
  value = 1,
  size = "sm",
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        className,
        "inline-flex items-center justify-between gap-3"
      )}
    >
      <CountButtonIcon
        onClick={() => onClick?.("minus")}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>

      <CountButtonIcon
        onClick={() => onClick?.("plus")}
        size={size}
        type="plus"
      />
    </div>
  );
};
