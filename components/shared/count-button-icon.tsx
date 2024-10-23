import React from "react";
import { cn } from "@/lib/utils";
import { CountButtonProps } from "./count-button";
import { Button } from "../ui";
import { Minus, Plus } from "lucide-react";

interface IconButtonProps {
  size?: CountButtonProps["size"];
  disabled?: boolean;
  onClick?: () => void;
  type?: "plus" | "minus";
}

export const CountButtonIcon: React.FC<IconButtonProps> = ({
  size = "sm",
  disabled,
  onClick,
  type,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
        size === "sm" ? "size-[30px] rounded-[10px]" : "size-[38px] rounded-md"
      )}
    >
      {type === "plus" ? (
        <Plus className={size === "sm" ? "h-4" : "h-5"} />
      ) : (
        <Minus className={size === "sm" ? "h-4" : "h-5"} />
      )}
    </Button>
  );
};
