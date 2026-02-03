"use client";

import Image from "next/image";
import React, { useId } from "react";
import { cn } from "@/lib/utils";

type CheckboxVariant = "default" | "large";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  variant?: CheckboxVariant;
  onToggle?: () => void;
  checked: boolean;
}

export const Checkbox = ({
  label,
  checked,
  className = "",
  id,
  name,
  variant = "default",
  onToggle,
}: CheckboxProps) => {
  const generatedId = useId();
  const finalId = id || generatedId;

  const imageSize = 32;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 1. 실제 체크박스 아이콘 (여기만 클릭하면 토글) */}
      <div
        className="relative flex-shrink-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // ✅ 부모의 클릭 이벤트(상세 이동)를 방해하지 않음
          onToggle?.();
        }}
      >
        <Image
          src={
            checked
              ? "/images/ic/checkbox-active.png"
              : "/images/ic/checkbox.png"
          }
          width={32}
          height={32}
          alt="checkbox"
        />
      </div>

      {/* 2. 텍스트 부분 (여기는 그냥 보여주기만 함, 부모가 클릭 이벤트를 처리함) */}
      {label && (
        <span
          className={cn(
            "truncate typo-b16",
            checked && "line-through text-slate-400",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};
