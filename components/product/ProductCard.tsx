import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariations } from "deco-sites/suztec/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Button from "$store/components/ui/Button.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  buttonText?: HTML;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 277;
const HEIGHT = 322;

function ProductCard(
  { product, preload, itemListName, buttonText = "COMPRAR" }: Props,
) {
  const {
    url,
    productID,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);
  const { productVariations } = useVariations(
    product,
    [],
  );
  const variants = Object.entries(Object.values(productVariations)[0] ?? {});
  const clickEvent = {
    name: "select_item" as const,
    params: {
      item_list_name: itemListName,
      items: [
        mapProductToAnalyticsItem({
          product,
          price,
          listPrice,
        }),
      ],
    },
  };

  const getInstalment = (product: Product): number[] => {
    let min = 0;
    let increment = 0;
    const instalments = [];
    const offers = product.offers?.offers || [];
    offers.map((offer) => {
      offer.priceSpecification.map((item) => {
        if (item.billingDuration! > min) {
          min = item.billingDuration!;
          increment = item.billingIncrement!;
        }
      });
    });

    instalments[0] = min;
    instalments[1] = increment;
    return instalments;
  };
  const id = `product-card-${productID}`;

  return (
    <div
      class="card card-compact cursor-pointer hover:border-black h-full rounded-none card-bordered border-transparent hover:border-base-200 group w-full"
      data-deco="view-product"
      id={id}
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
      <figure class="relative " style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        {/* Wishlist button */}
        <div class="absolute top-2 right-3 z-10">
          <WishlistIcon productGroupID={productGroupID} productID={productID} />
        </div>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="contents"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class="absolute transition-opacity rounded-none w-full opacity-100 "
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      {/* Prices & Name */}
      <figcaption class=" flex justify-center py-2 lg:py-0 w-full transition-opacity lg:opacity-0 group-hover:opacity-100">
        <a href={url}>
        <Button
          class="mx-auto -top-3 rounded-none text-base font-normal  transform transition-all lg:group-hover:translate-y-3"
          variant={"secondary"}
        >
          <Markdown text={buttonText} />
        </Button>
        </a>
      </figcaption>
      <div class="px-[2px] lg:mt-8 mt-6">
        <h3 class="text-center min-h-[32px]  leading-4 text-lg font-medium">
          {product.isVariantOf?.name?.toUpperCase()}
        </h3>
        <div class="flex flex-col justify-center">
          <span class="text-black text-center font-extralight text-lg">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>

          <span class="text-[#757575] text-center font-light text-[11px] ">
            {getInstalment(product)[0] != 0
              ? `${getInstalment(product)[0]}x de R$ ${
                formatPrice(getInstalment(product)[1])
              } sem juros`
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
