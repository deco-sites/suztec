import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
  variant: "size" | "color";
  inStock?: boolean;
}

function VariantSelector(
  { product, product: { url }, variant = "size", inStock }: Props,
) {
  const possibilities = useVariantPossibilities(product);

  return (
    <ul class="flex flex-col gap-4">
      <li class="flex flex-col gap-2">
        <span class="text-base text-[#353535] font-bold">
          {variant === "size" ? "Tamanho" : "Cor"}
        </span>
        <ul class="flex flex-wrap max-w-[400px] gap-1">
          {possibilities!.map((item, i) => (
            <li>
              <a href={item.url[0]}>
                <Avatar
                  inStock={inStock}
                  type={variant === "size" ? "size" : "color"}
                  content={variant === "size"
                    ? item.size
                    : i === 0
                    ? product.image![0].url
                    : ""}
                  variant={item.url[0] === url ? "active" : "default"}
                />
              </a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}

export default VariantSelector;
