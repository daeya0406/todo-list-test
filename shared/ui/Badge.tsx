import Image from "next/image";
import { cn } from "@/lib/utils";

type BadgeStatus = "todo" | "done";

interface BadgeProps {
  status: BadgeStatus;
  className?: string;
}

export const Badge = ({ status, className }: BadgeProps) => {
  const isDone = status === "done";

  return (
    <Image
      src={isDone ? "/images/img/badge-done.png" : "/images/img/badge-todo.png"}
      width={101}
      height={36}
      className={cn(className)}
      alt={status}
    />
  );
};
