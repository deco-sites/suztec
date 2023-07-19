import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

export interface Props {
  buttonText: HTML;
  /**
   * @title Texto do botão
   */
  placeHolder?: string;
  /**
   * @title placeholder
   */
  buttonColor?: string;
  /**
   * @title Cor do botão
   */
}

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

function Newsletter(
  {
    buttonText = "ENVIAR",
    placeHolder = "Digite seu e-mail...",
    buttonColor = "black",
  }: Props,
) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-20 w-full">
      <form
        class="font-body text-body w-full lg:w-[408px] form-control"
        onSubmit={handleSubmit}
      >
        <div class="rounded-none flex">
          <input
            name="email"
            class="flex-grow pl-[15px] placeholder:font-light py-[11px] w-full text-sm font-normal outline-none border-b border-t border-l transition-all ease-out duration-300 hover:border-b-gray-500 hover:border-t-gray-500 hover:border-l-gray-500 hover:placeholder:text-gray-600"
            placeholder={placeHolder}
          />
          <button
            style={`background-color: ${buttonColor} `}
            class="btn rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] min-w-[114px] rounded-l-none text-white disabled:loading"
            disabled={loading}
          >
            <Markdown text={buttonText} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
