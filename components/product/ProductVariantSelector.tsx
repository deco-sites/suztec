import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
  variant: "size" | "color";
}

function VariantSelector(
  { product, product: { url }, variant = "size" }: Props,
) {
  const possibilities = useVariantPossibilities(product);
  
  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-base text-[#353535] font-bold">{variant === "size" ? "Tamanho" : "Cor"}</span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, [link]], i) => (
              <li>
                <a href={link}>
                  <Avatar
                    type={variant === "size" ? "size" : "color"}
                    content={variant === "size"
                      ? value
                      : i === 0 ? product.image![0].url : ""}
                    variant={link === url ? "active" : "default"}
                  />
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
