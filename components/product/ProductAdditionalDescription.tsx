import Icon from "$store/components/ui/Icon.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

const ProductAdditionalDescription = ({ product }: Props) => {
  const result = product.isVariantOf?.additionalProperty.reduce(
    (acc: any, curr: any) => {
      if (
        curr.name === "Tecnologias" || curr.name === "Características" ||
        curr.name === "Dados Técnicos"
      ) {
        if (!acc[curr.name]) {
          acc[curr.name] = [];
        }
        acc[curr.name].push(curr.value);
      }
      return acc;
    },
    [],
  );
  const arrayInString = result["Dados Técnicos"].join("");
  const arrayInList = arrayInString.split("\r\n");

  return (
    <div>
      <details class="border-b border-black">
        <summary class="flex justify-between cursor-pointer text-[#252526] text-[16px] font-bold py-3 text-lg">
          Tecnologia
          <Icon
            class="text-black"
            id="ChevronDown"
            width={15}
            height={24}
            strokeWidth={"3"}
          />
        </summary>

        <div class="mt-2 mb-5 mx-3 transition-all text-sm font-light duration-200">
          {result["Características"].map((item: string) => <div>{item}</div>)}
        </div>
      </details>
      <details class="border-b border-black">
        <summary class="flex justify-between cursor-pointer text-[#252526] text-[16px] font-semibold py-3 text-lg">
          Características
          <Icon
            class="text-black"
            id="ChevronDown"
            width={15}
            height={24}
            strokeWidth={"3"}
          />
        </summary>
        <div class="mt-2 mb-5 mx-1 transition-all text-sm font-light duration-200">
          {result["Tecnologias"].map((item: string) => <div>{item}</div>)}
        </div>
      </details>
      <details>
        <summary class="flex justify-between cursor-pointer text-[#252526] font-semibold py-3 text-lg items-center">
          Dados Técnicos
          <Icon
            class="text-black"
            id="ChevronDown"
            width={15}
            height={24}
            strokeWidth={"3"}
          />
        </summary>
        <div class="mt-2 mb-5 mx-1 text-sm font-light">
          {arrayInList.map((item: string) => <div>{item}</div>)}
        </div>
      </details>
    </div>
  );
};

export default ProductAdditionalDescription;
