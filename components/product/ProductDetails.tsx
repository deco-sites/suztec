import { useId } from "preact/hooks";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import ProductSizeTable from "$store/components/product/ProductSizeTable.tsx";

export type Variant = "front-back" | "slider" | "auto";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
}

const WIDTH = 540;
const HEIGHT = 628;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    category,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
  );

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
  const categories = product.additionalProperty?.filter((property) =>
    property.name === "category"
  );
  const productCategory = categories?.at(-1)?.value;
  const arrayInString = result["Dados Técnicos"].join("");
  const arrayInList = arrayInString.split("\r\n");
  return (
    <>
      {/* Code and name */}
      <div>
        <h1 class="flex  items-center">
          <span class="font-normal text-[32px] leading-none text-[#170b0b] w-3/4">
            {product.isVariantOf?.name}
          </span>
          <div class="w-1/4 flex justify-end mb-10 mr-4">
            <WishlistButton
              variant="icon"
              productGroupID={isVariantOf?.productGroupID}
              productID={productID}
            />
          </div>
        </h1>
        <div>
          <span class="text-[10px] text-[#757575]">
            REF. {product.isVariantOf?.model}
          </span>
        </div>
      </div>
      <div class="block">
        <h3 class="text-lg font-semibold">Descrição</h3>
        <p class="text-sm text-[#757575]">{description}</p>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          <span class="font-bold text-[32px] text-black">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <span class="text-base text-[#757575] font-bold">
         <span class="text-base font-normal text-[#757575]">ou</span> {installments}
        </span>
      </div>
      {/* Sku Selector */}

      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} variant="color"/>
      </div>
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} variant="size" />
      </div>
      <div>
        <ProductSizeTable category={productCategory!} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class=" border mt-10 border-b" />
      <div class="mt-4 sm:mt-6 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                  price={price ?? 0}
                  discount={price && listPrice ? listPrice - price : 0}
                  name={product.name ?? ""}
                  productGroupId={product.isVariantOf?.productGroupID ?? ""}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {product.additionalProperty && (
            <div>
              <details class="border-b border-black">
                <summary class="flex justify-between cursor-pointer text-[#252526] text-[16px] font-semibold py-3 text-lg">
                  Tecnologias
                  <Icon
                    class="text-black"
                    id="ChevronDown"
                    width={15}
                    height={24}
                    strokeWidth={"3"}
                  />
                </summary>

                <div class="mt-2 mb-5 mx-1 transition-all duration-200">
                  {result["Características"].map((item: string) => (
                    <div>{item}</div>
                  ))}
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
                <div class="mt-2 mb-5 mx-1 transition-all duration-200">
                  {result["Tecnologias"].map((item: string) => (
                    <div>{item}</div>
                  ))}
                </div>
              </details>
              <details>
                <summary class="flex justify-between cursor-pointer text-[#252526] text-[16px] font-semibold py-3 text-lg items-center">
                  Dados Técnicos
                  <Icon
                    class="text-black"
                    id="ChevronDown"
                    width={15}
                    height={24}
                    strokeWidth={"3"}
                  />
                </summary>
                <div class="mt-2 mb-5 mx-1">
                  {arrayInList.map((item: string) => <div>{item}</div>)}
                </div>
              </details>
            </div>
          )}
        </span>
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

/**
 * Here be dragons
 *
 * bravtexfashionstore (VTEX default fashion account) has the same images for different skus. However,
 * VTEX api does not return the same link for the same image. This causes the image to blink when
 * the user changes the selected SKU. To prevent this blink from happening, I created this function
 * bellow to use the same link for all skus. Example:
 *
 * {
    skus: [
      {
        id: 1
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/123/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/124/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/125/c.jpg"
        ]
      },
      {
        id: 2
        image: [
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
          "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
        ]
      }
    ]
  }

  for both skus 1 and 2, we have the same images a.jpg, b.jpg and c.jpg, but
  they have different urls. This function returns, for both skus:

  [
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/321/a.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/322/b.jpg",
    "https://bravtexfashionstore.vtexassets.com/arquivos/ids/323/c.jpg"
  ]

  This is a very catalog dependent function. Feel free to change this as you wish
 */
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
}: { page: ProductDetailsPage; variant: Variant }) {
  const { product, breadcrumbList } = page;
  const id = `product-image-gallery:${useId()}`;
  const images = useStableImages(product);

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <div>
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
        <div
          id={id}
          class="flex flex-row max-w-[1140px] sm:justify-center mt-2"
        >
          <div class="w-7/12 flex flex-row">
            {/* Dots */}
            <ul class="flex  sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1 w-2/12">
              {images.map((img, index) => (
                <li class="min-w-[63px] sm:min-w-[93px]">
                  <Slider.Dot index={index}>
                    <Image
                      style={{ aspectRatio: ASPECT_RATIO }}
                      class="group-disabled:border-base-300 border rounded "
                      width={93}
                      height={108}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
            {/* Image Slider */}
            <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1 w-5/6">
              <Slider class="carousel max-w-[540px]">
                {images.map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item"
                  >
                    <Image
                      class="w-full max-h-[628px]"
                      sizes="(max-width: 540px) w-full"
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      // Preload LCP image for better web vitals
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Slider.Item>
                ))}
              </Slider>

              <Slider.PrevButton class="no-animation absolute left-0 top-80">
                <Icon size={20} id="ChevronLeft" strokeWidth={3} />
              </Slider.PrevButton>

              <Slider.NextButton
                class="no-animation absolute right-0 top-80"
                disabled={images.length < 2}
              >
                <Icon size={20} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>

              <div class="absolute top-2 right-2 bg-base-100 rounded-full">
                <ProductImageZoom
                  images={images}
                  width={1280}
                  height={1280 * HEIGHT / WIDTH}
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div class="px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1 w-5/12">
            <ProductInfo page={page} />
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
      </div>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="flex sm:flex-row flex-col sm:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 sm:pr-0 sm:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails({ page, variant: maybeVar = "auto" }: Props) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="max-w-[1140px] mx-auto py-0 sm:py-2">
      {page ? <Details page={page} variant={variant} /> : <NotFound />}
    </div>
  );
}

export default ProductDetails;
