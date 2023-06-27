import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

function Newsletter() {
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
            class="flex-grow pl-[15px] py-[11px] w-full text-sm font-normal outline-none border-b border-t border-l transition-all ease-out duration-300 hover:border-b-gray-500 hover:border-t-gray-500 hover:border-l-gray-500 hover:placeholder:text-gray-600"
            placeholder="Digite seu E-mail..."
          />
          <button
            class="btn rounded-r-[1px] text-base font-normal traking-[0.5px] rounded-l-none text-white disabled:loading"
            disabled={loading}
          >
            ENVIAR
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
