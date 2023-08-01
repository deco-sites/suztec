import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

interface Props {
  productID: Product["productID"];
}

const notifyme = Runtime.create("deco-sites/std/actions/vtex/notifyme.ts");

function Notify({ productID }: Props) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await notifyme({ skuId: productID, name, email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <span class="text-[21px] font-semibold text-center">AVISE-ME</span>
      <span class="text-sm text-[#333333] font-light pt-4">
        Para ser avisado da disponibilidade deste Produto, basta preencher os
        campos abaixo.
      </span>

      <input
        placeholder="Digite seu nome..."
        class="input input-bordered max-h-[38px] rounded-none placeholder:text-sm placeholder:text-[#757575] placeholder:font-light bg-[#cfcfcf] hover:bg-white transition-all ease-in-out duration-200"
        name="name"
      />
      <div class="flex flex-row">
        <input
          placeholder="Digite seu e-mail..."
          class="input w-full input-bordered max-h-[38px] rounded-none placeholder:text-sm placeholder:text-[#757575] placeholder:font-light bg-[#cfcfcf] hover:bg-white transition-all ease-in-out duration-200"
          name="email"
        />

        <button
          class="btn disabled:loading text-base bg-black text-white rounded-none hover:opacity-80 opacity-100 min-h-0 h-[38px] min-w-[74px] ml-[13px]"
          disabled={loading}
        >
          OK
        </button>
      </div>
    </form>
  );
}

export default Notify;
