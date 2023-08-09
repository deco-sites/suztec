import type { JSX } from "preact";

interface Color {
  variant: "Cor";
  content: string;
  quantity?: number;
  isModal?: boolean;
}

interface Size {
  variant: "Tamanho";
  content: string;
  quantity?: number;
  isModal?: boolean;
}

type Props =
  & Omit<JSX.IntrinsicElements["button"], "content">
  & (Color | Size);

function Avatar(
  {
    variant,
    content,
    quantity,
    class: _class = "",
    selected,
    disabled,
    isModal,
    ...btnProps
  }: Props,
) {
  
  if (variant === "Cor") {
    return (
      <div
        class={`${selected ? "border-b-[4px] border-black rounded-sm" : "hover:border-b-[4px] hover:border-black hover:rounded-sm"}`}
      >
        
        <div
          class={`rounded-[2px] h-[65px]`}
        >
          <img
            src={content}
            width={53}
            height={53}
            class="hover:border hover:border-black transition-all duration-200"
          />
        </div>
      </div>
    );
  }

  if (variant === "Tamanho") {
    return (
      <button
        {...btnProps}
        disabled={selected || disabled}
        class={disabled && selected
          ? "text-sm cursor-pointer rounded-[2px] bg-black text-white opacity-[18%] hover:opacity-30 line-through uppercase border  border-black px-[13px] py-[9px] transition-all duration-200"
          : disabled
          ? "text-sm cursor-pointer rounded-[2px] bg-white text-[#111111] opacity-[18%] hover:opacity-30 line-through uppercase border  border-black px-[13px] py-[9px] transition-all duration-200"
          : selected
          ? "text-sm cursor-pointer rounded-[2px] uppercase border  border-black  bg-black text-white  px-[13px] py-[9px]"
          : `
        text-sm cursor-pointer rounded-[2px] uppercase border  border-black  hover:bg-black hover:text-white transition-all duration-200 px-[13px] py-[9px]
       `}
      >
        {content}
      </button>
    );
  }

  return <button {...btnProps} class={_class}>{content}</button>;
}

export default Avatar;
