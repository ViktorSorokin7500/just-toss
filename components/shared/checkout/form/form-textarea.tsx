"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui";
import { ErrorText } from "./error-text";
import { X } from "lucide-react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  className?: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />

        {value && (
          <button
            onClick={onClickClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-35 hover:opacity-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
