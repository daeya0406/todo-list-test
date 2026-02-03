"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Checkbox } from "@/shared/ui/CheckBox";
import { InputBox } from "@/shared/ui/InputBox";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";

export default function Playground() {
  const methods = useForm({
    defaultValues: {
      todo: "",
      checkTodo: false,
      lgCheckTodo: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => console.log(data))}
        className="flex flex-col items-start gap-3"
      >
        <InputBox name="todo" />

        <Button action="add" />
        <Button action="delete" />
        <Button action="complete" />
        <Button action="add" variant="circle" />

        <Button action="add" variant="large-circle" />
        <Button action="edit" variant="large-circle" />

        <Checkbox label="비타민 챙겨먹기" name="checkTodo" checked={false} />
        <Checkbox
          label="비타민 챙겨먹기"
          name="lgCheckTodo"
          variant="large"
          checked={false}
        />

        <Badge status="todo" />
        <Badge status="done" />
      </form>
    </FormProvider>
  );
}
