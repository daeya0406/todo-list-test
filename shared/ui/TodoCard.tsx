"use client";

import Link from "next/link";
import { Checkbox } from "@/shared/ui/CheckBox";
import { cn } from "@/lib/utils";

interface TodoCardProps {
  id: number;
  name: string;
  isCompleted: boolean;
  onToggle: (id: number, status: boolean) => void;
}

export const TodoCard = ({
  id,
  name,
  isCompleted,
  onToggle,
}: TodoCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex items-center w-full border-2 border-slate-900 rounded-full transition-colors overflow-hidden",
        isCompleted ? "bg-violet-100 border-violet-500" : "bg-white",
      )}
    >
      {/* 체크박스 클릭 영역 */}
      <div
        className="flex-shrink-0 pl-3 py-2 z-30 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // Link로의 전파 방지
          onToggle(id, isCompleted);
        }}
      >
        <div className="pointer-events-none flex items-center justify-center">
          <Checkbox name={`item_${id}`} checked={isCompleted} />
        </div>
      </div>

      <Link
        href={`/items/${id}`}
        className="flex-1 flex items-center min-w-0 pr-4 py-2 h-full z-10"
      >
        <span
          className={cn(
            "ml-3 truncate typo-b16 block",
            isCompleted && "line-through text-slate-400",
          )}
        >
          {name}
        </span>
      </Link>
    </div>
  );
};
