import Image from "next/image";
import React from "react";

type ButtonAction = "add" | "delete" | "complete" | "edit";
type ButtonVariant = "default" | "circle" | "large-circle";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action: ButtonAction;
  variant?: ButtonVariant;
}

export const Button = ({
  action,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) => {
  const isLarge = variant === "large-circle";

  const actionConfig = {
    add: {
      text: "추가하기",
      bgClass: isLarge
        ? "bg-slate-200 text-slate-900"
        : "bg-slate-200 text-slate-900 hover:bg-violet hover:text-white",
      renderIcon: (large: boolean) =>
        large ? (
          <Image
            src="/images/ic/btn-add-large.png"
            width={24}
            height={24}
            alt="추가"
          />
        ) : (
          <div
            className="w-4 h-4 bg-current"
            style={{
              maskImage: "url(/images/ic/btn-add.svg)",
              WebkitMaskImage: "url(/images/ic/btn-add.svg)",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
            }}
          />
        ),
    },
    edit: {
      text: "수정하기",
      bgClass: "bg-slate-900/50 border-2 border-slate-900",
      renderIcon: () => (
        <Image
          src="/images/ic/btn-edit.png"
          width={16}
          height={16}
          alt="수정"
        />
      ),
    },
    delete: {
      text: "삭제하기",
      bgClass: "bg-rose text-white",
      renderIcon: () => (
        <Image
          src="/images/ic/btn-delete.png"
          width={16}
          height={16}
          alt="삭제"
        />
      ),
    },
    complete: {
      text: "수정 완료",
      bgClass: "bg-slate-200 hover:bg-lime",
      renderIcon: () => (
        <Image
          src="/images/ic/btn-complete.png"
          width={16}
          height={16}
          alt="완료"
        />
      ),
    },
  };

  const config = actionConfig[action];

  const variantStyles = {
    default: "dy-solid px-6 py-3 rounded-lg gap-2 min-w-[164px]",
    circle: "dy-solid rounded-full w-13 h-13",
    "large-circle": "rounded-full w-16 h-16",
  };

  const baseStyles = `group flex items-center justify-center transition-all active:scale-95 cursor-pointer ${config.bgClass}`;

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <div
        className={`flex items-center justify-center ${
          isLarge && action !== "add" ? "scale-150" : ""
        }`}
      >
        {config.renderIcon(isLarge)}
      </div>

      {variant === "default" && <span className="typo-b16">{config.text}</span>}
    </button>
  );
};
