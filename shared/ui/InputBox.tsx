import React, { useId } from "react";
import { useFormContext } from "react-hook-form";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

export const InputBox = ({
  label,
  placeholder = "할 일을 입력하세요",
  className = "",
  name,
  ...props
}: InputBoxProps) => {
  const generatedId = useId();
  const finalId = props.id || generatedId;

  const { register } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor={finalId} className="typo-b16 ml-1 text-slate-900">
          {label}
        </label>
      )}
      <input
        {...props}
        {...register(name)}
        id={finalId}
        type="text"
        placeholder={placeholder}
        className={`
          w-full px-6 py-3 typo-m16 bg-slate-100 dy-solid
          placeholder:text-slate-500 focus:outline-none transition-all
          ${className} 
        `}
      />
    </div>
  );
};
