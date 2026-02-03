"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { InputBox } from "@/shared/ui/InputBox";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";
import { itemService } from "@/shared/api/itemService";
import { TodoCard } from "@/shared/ui/TodoCard";

interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const methods = useForm({ defaultValues: { todo: "" } });

  const fetchTasks = useCallback(async () => {
    try {
      const data = await itemService.getList();
      setTasks(data);
    } catch {
      console.error("로딩 실패");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  const onSubmit = async (data: { todo: string }) => {
    if (!data.todo.trim()) return;
    try {
      const newItem = await itemService.create(data.todo);
      setTasks((prev) => [...prev, newItem]);
      methods.reset();
    } catch {
      alert("추가 실패");
    }
  };

  const onToggle = async (id: number, currentStatus: boolean) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !currentStatus } : item,
      ),
    );

    try {
      await itemService.update(id, { isCompleted: !currentStatus });
    } catch {
      await fetchTasks();
      alert("변경 실패");
    }
  };

  const todoItems = useMemo(
    () => tasks.filter((item) => !item.isCompleted),
    [tasks],
  );
  const doneItems = useMemo(
    () => tasks.filter((item) => item.isCompleted),
    [tasks],
  );

  return (
    <main className="min-h-screen space-y-10 p-4">
      {/* 추가하기 */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex w-full gap-4 max-w-4xl mx-auto"
        >
          <InputBox name="todo" />
          <Button
            action="add"
            variant="circle"
            type="submit"
            className="sm:hidden flex-shrink-0"
          />
          <Button
            action="add"
            type="submit"
            className="hidden sm:flex flex-shrink-0"
          />
        </form>
      </FormProvider>

      {/* 리스트 */}
      <div className="flex flex-col md:flex-row gap-6 w-full items-start max-w-7xl mx-auto">
        {/* TODO */}
        <div className="flex flex-col gap-4 w-full">
          <Badge status="todo" />
          <div className="flex flex-col gap-4">
            {todoItems.length > 0 ? (
              todoItems.map((item) => (
                <TodoCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  isCompleted={item.isCompleted}
                  onToggle={onToggle}
                />
              ))
            ) : (
              <EmptyContent type="todo" />
            )}
          </div>
        </div>

        {/* DONE */}
        <div className="flex flex-col gap-4 w-full">
          <Badge status="done" />
          <div className="flex flex-col gap-4">
            {doneItems.length > 0 ? (
              doneItems.map((item) => (
                <TodoCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  isCompleted={item.isCompleted}
                  onToggle={onToggle}
                />
              ))
            ) : (
              <EmptyContent type="done" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function EmptyContent({ type }: { type: "todo" | "done" }) {
  const isTodo = type === "todo";
  return (
    <div className="flex flex-col items-center justify-center py-10 text-slate-400 w-full">
      <Image
        src={`/images/img/${type}-lg.png`}
        width={240}
        height={240}
        alt="empty"
        className="hidden sm:block"
      />
      <Image
        src={`/images/img/${type}-sm.png`}
        width={120}
        height={120}
        alt="empty"
        className="block sm:hidden"
      />
      <p className="mt-4 text-center typo-b16 whitespace-pre-wrap">
        {isTodo
          ? "할 일이 없어요.\nTODO를 새롭게 추가해주세요!"
          : "아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!"}
      </p>
    </div>
  );
}
