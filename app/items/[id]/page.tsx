"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/shared/ui/Button";
import { itemService } from "@/shared/api/itemService";
import { EditableTodoHeader } from "@/shared/ui/EditTodoHeader";

interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
}

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = Number(params.id);

  const [task, setTask] = useState<TodoItem | null>(null);
  const methods = useForm({
    defaultValues: { name: "", memo: "" },
  });

  // 데이터 로드
  const fetchTaskDetail = useCallback(async () => {
    try {
      const data = await itemService.getDetail(itemId);
      setTask(data);
      methods.reset({ name: data.name, memo: data.memo || "" });
    } catch (error) {
      alert("항목을 찾을 수 없습니다.");
      router.push("/");
    }
  }, [itemId, methods, router]);

  useEffect(() => {
    if (itemId) fetchTaskDetail();
  }, [itemId, fetchTaskDetail]);

  // 이미지 검증 및 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 유효성 검사
    if (!/^[A-Za-z0-9._\s-]+$/.test(file.name)) {
      return alert("이미지 파일 이름은 영어로만 가능합니다.");
    }
    if (file.size > 5 * 1024 * 1024) {
      return alert("5MB 이하의 파일만 업로드 가능합니다.");
    }

    try {
      // 서비스 호출하여 이미지 업로드
      const result = await itemService.uploadImage(file);

      // 서버 응답에서 받은 url을 task 상태에 저장
      setTask((prev) => (prev ? { ...prev, imageUrl: result.url } : null));

      alert("이미지가 업로드되었습니다.");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const onSave = async (data: { name: string; memo: string }) => {
    if (!task) return;
    try {
      await itemService.update(itemId, {
        name: data.name,
        memo: data.memo,
        isCompleted: task.isCompleted,
        imageUrl: task.imageUrl,
      });
      router.push("/");
    } catch (error) {
      alert("수정 실패");
    }
  };

  // 삭제
  const onDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await itemService.delete(itemId);
      alert("삭제되었습니다.");
      router.push("/"); // 삭제 후 목록으로
    } catch (error) {
      console.error("삭제 에러:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!task) return null; // 로딩 중 레이아웃 깨짐 방지

  return (
    <main className="min-h-screen p-4 max-w-4xl mx-auto space-y-8 py-10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSave)} className="space-y-6">
          {/* 상단 체크박스 및 이름 수정 영역 */}
          <EditableTodoHeader
            isCompleted={task.isCompleted}
            onToggle={() =>
              setTask({ ...task, isCompleted: !task.isCompleted })
            }
            register={methods.register}
            name="name"
          />

          <div className="w-full grid grid-cols-1 md:grid-cols-[4fr_6fr] gap-6">
            {/* 이미지 영역 */}
            <div className="relative h-[311px] rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 overflow-hidden group">
              {task.imageUrl ? (
                <Image
                  src={task.imageUrl}
                  fill
                  alt="preview"
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/images/ic/no-image.png"
                  width={64}
                  height={64}
                  alt="no-img"
                  className="abs-center"
                />
              )}

              {/* 이미지 유무에 따른 버튼 분기 처리 */}
              <div className="absolute right-4 bottom-4">
                {/* label에 htmlFor를 지정하고 클릭 이벤트 제거 */}
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="pointer-events-none">
                    <Button
                      action={task.imageUrl ? "edit" : "add"}
                      variant="large-circle"
                      type="button"
                    />
                  </div>
                </label>

                {/* 3. input에 id를 부여 */}
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* 메모 영역 */}
            <div className="relative flex flex-col items-center h-[311px] p-6 overflow-hidden rounded-xl">
              <Image
                src="/images/img/bg-memo.png"
                fill
                alt="memo-bg"
                className="object-cover -z-10"
              />
              <h4 className="relative text-amber-600 typo-eb18 mb-4">Memo</h4>
              <textarea
                {...methods.register("memo")}
                className="relative flex-1 w-full bg-transparent text-center focus:outline-none resize-none typo-m16 leading-relaxed"
                placeholder="메모를 입력하세요"
              />
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-center md:justify-end gap-4">
            <Button action="complete" type="submit" className="w-40" />
            <Button
              action="delete"
              type="button"
              onClick={onDelete}
              className="w-40"
            />
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
