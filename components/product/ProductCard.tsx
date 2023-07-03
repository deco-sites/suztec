import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { sendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Button from "$store/components/ui/Button.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 277;
const HEIGHT = 322;

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
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

  return (
    <div
      class="card card-compact cursor-pointer hover:border-black h-full rounded-none card-bordered border-transparent hover:border-base-200 group w-full"
      data-deco="view-product"
      id={`product-card-${productID}`}
      {...sendEventOnClick(clickEvent)}
    >
      <figure class="relative " style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        {/* Wishlist button */}
        <div class="absolute top-0 right-0 z-10">
          {/* <WishlistIcon productGroupID={productGroupID} productID={productID} /> */}
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
      <figcaption class="flex justify-center py-2 w-full transition-opacity lg:opacity-0 group-hover:opacity-100">
        <Button
          class="mx-auto rounded-none text-base font-normal"
          variant={"secondary"}
        >
          COMPRAR
        </Button>
      </figcaption>
      <div class="px-[2px]">
        <h3 class="text-center min-h-[46px] leading-4 text-lg font-medium">
          {product.isVariantOf?.name?.toUpperCase()}
        </h3>
        <div class="flex flex-col justify-center">
          <span class="text-black text-center font-extralight text-lg">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
          <span class="text-black text-center font-extralight text-xs ">
            10x de R$ 219,00 sem juros
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
