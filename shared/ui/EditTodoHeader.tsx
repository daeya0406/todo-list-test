"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { UseFormRegister } from "react-hook-form";

interface EditableTodoHeaderProps {
  isCompleted: boolean;
  onToggle: () => void;
  register: UseFormRegister<any>;
  name: string;
}

export const EditableTodoHeader = ({
  isCompleted,
  onToggle,
  register,
  name,
}: EditableTodoHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full px-5 py-3 border-2 border-slate-900 rounded-3xl transition-colors",
        isCompleted ? "bg-violet-100 border-violet-600" : "bg-white",
      )}
    >
      {/* 체크박스 아이콘 */}
      <button
        type="button"
        onClick={onToggle}
        className="relative flex-shrink-0 w-8 h-8 cursor-pointer"
      >
        <Image
          src={
            isCompleted
              ? "/images/ic/checkbox-active.png"
              : "/images/ic/checkbox.png"
          }
          fill
          alt="checkbox"
        />
      </button>

      {/* 이름 수정 입력 */}
      <input
        {...register(name)}
        className={cn(
          "flex-1 bg-transparent text-center typo-eb18 focus:outline-none ml-4 underline underline-offset-4 decoration-2",
          isCompleted ? "text-slate-800" : "text-slate-900",
        )}
      />
    </div>
  );
};
