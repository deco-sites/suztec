import Avatar from "deco-sites/suztec/components/ui/Avatar.tsx";
import { useVariations } from "deco-sites/suztec/sdk/useVariantPossiblities.ts";
import { inStock } from "deco-sites/suztec/sdk/useOffer.ts";
import { useQuickView } from "../../sdk/useQuickView.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
interface Props {
  product: Product;
  similars: Product[] | undefined;
  selectedID?: string;
  isQuickView?: boolean;
}

const SelectorRow = ({
  name,
  values,
  selected,
  onSelect,
  isQuickView,
}: {
  name: "Cor" | "Tamanho";
  selected: number;
  values: Array<{
    content: string;
    disabled?: boolean;
    value: string;
    url: string;
  }>;
  onSelect?: (index: number) => void;
  isQuickView?: boolean;
}) => {
  const maybeVal = values[selected]?.value;
  values.sort((a, b) => {
    const sizeOrder = ["PPP", "PP", "P", "M", "G", "GG", "GGG", "GGGG"];
    const indexA = sizeOrder.findIndex((size) =>
      size.toUpperCase() === a.value.toUpperCase()
    );
    const indexB = sizeOrder.findIndex((size) =>
      size.toUpperCase() === b.value.toUpperCase()
    );

    if (indexA === -1 && indexB === -1) {
      return 0;
    }
    if (indexA === -1) {
      return 1;
    }

    if (indexB === -1) {
      return -1;
    }

    return indexA - indexB;
  });

  return (
    <li class="flex flex-col gap-2">
      <div class="font-bold text-[16px] tracking-[0.8px]">
        {name}
      </div>
      <ul
        class={`flex flex-row flex-wrap  ${name === "Cor" ? "gap-4" : "gap-1"}`}
      >
        {values.map(({ content, url, disabled }, index) => {
          return (
            <li>
              <a href={url}>
                <Avatar
                  onClick={(e) => {
                    if (name !== "Cor" || isQuickView) {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelect?.(index);
                    }
                  }}
                  content={content}
                  selected={(name === "Tamanho" && maybeVal === content) ||
                    (name !== "Tamanho" && selected === index)}
                  disabled={disabled}
                  variant={name}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

function VariantSelector(
  { product, similars, isQuickView }: Props,
) {
  const { select } = useQuickView();
  const { productVariations, productGroupVariations } = useVariations(
    product,
    similars ?? [],
  );

  const { url } = product;

  const colors = productGroupVariations.get("color");
  const sizes = productVariations.get("Tamanho");

  sizes?.sort((a, b) => {
    const sizeOrder = ["PPP", "PP", "P", "M", "G", "GG", "GGG", "GGGG"];
    const indexA = sizeOrder.findIndex((size) =>
      size.toUpperCase() === a.property?.value?.toUpperCase()
    );
    const indexB = sizeOrder.findIndex((size) =>
      size.toUpperCase() === b.property?.value?.toUpperCase()
    );
    if (indexA === -1 && indexB === -1) {
      return 0;
    }
    if (indexA === -1) {
      return 1;
    }

    if (indexB === -1) {
      return -1;
    }

    return indexA - indexB;
  });
  
  return (
    <ul class="flex flex-col gap-4">
      {colors && (
        <SelectorRow
          name="Cor"
          selected={colors.findIndex((i) =>
           i.item.productGroupID === product.isVariantOf?.productGroupID
          )}
          values={colors.map((i) => {
            return {
              content: i.item.hasVariant[0]?.image?.at(0)?.url ??
                "",
              value: i.property.value!.replace(/#.*/, "").toLowerCase(),
              url: i.item.url!,
            };
          })}
          onSelect={(index) => {
            const p = colors[index].item;
            const productGroupID = p.productGroupID;

            if (!productGroupID) {
              return;
            }

            select({ productGroupID });
          }}
          isQuickView={isQuickView}
        />
      )}
      {sizes &&
        (
          <SelectorRow
            name="Tamanho"
            selected={sizes.findIndex((i) => i.item.url === url)}
            values={sizes.map((i) => ({
              content: i.property.value!,
              value: i.property.value!,
              url: i.item.url!,
              disabled: !inStock(i.item.offers),
            }))}
            onSelect={(index) => {
              const p = sizes[index].item;

              const productID = p.productID;
              if (!productID) {
                return;
              }

              select({ productID });
            }}
          />
        )}
    </ul>
  );
}

export default VariantSelector;
