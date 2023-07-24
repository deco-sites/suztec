/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "",
  "disabled": "bg-neutral-content text-neutral",
  "default": "bg-base-100 text-primary",
};

interface Props {
  type: "size" | "color";
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "bg-black text-white",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-base-200 hover:border-primary",
};

function Avatar({ content, variant = "default", type = "size" }: Props) {
  return (
    <div>
      {type === "size"
        ? (
          <div
            class={`text-sm rounded-[2px] uppercase  border  border-black  hover:bg-black hover:text-white transition-all duration-200  ${variants[variant]}`}
          >
            <div class="px-[13px] py-[9px]">
              {colors[content] ? "" : content.substring(0, 4)}
            </div>
          </div>
        )
        : (
          <div
            class={`${
              variant === "active"
                ? "border-b-[4px] border-black rounded-sm"
                : ""
            }`}
          >
            {content != ""
              ? (
                <div
                  class={`rounded-[2px] h-[63px] `}
                >
                  <img
                    src={content}
                    width={52}
                    height={55}
                    class="hover:border hover:border-black transition-all duration-200"
                  />
                </div>
              )
              : ""}
          </div>
        )}
    </div>
  );
}

export default Avatar;
