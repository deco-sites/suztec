import { useId } from "$store/sdk/useId.ts";
import { useSignal } from "@preact/signals";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Modal from "$store/components/ui/Modal.tsx";
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
import WishlistButton from "../wishlist/WishlistButton.tsx";
import ProductSizeTable from "$store/components/product/ProductSizeTable.tsx";
import { useQuickView } from "../../sdk/useQuickView.ts";
import ProductAdditionalDescription from "$store/components/product/ProductAdditionalDescription.tsx";
import { useVariations } from "deco-sites/suztec/sdk/useVariantPossiblities.ts";
import { inStock } from "deco-sites/suztec/sdk/useOffer.ts";

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
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments, inStock } = useOffer(
    offers,
  );
  const similars = product.isSimilarTo;
  const categories = product.additionalProperty?.filter((property) =>
    property.name === "category"
  );
  const { productVariations } = useVariations(
    product,
    similars ?? [],
  );
 
  const productCategory = categories?.at(-1)?.value;
  const { selectedSku } = useQuickView();
  
  return (
    <>
      {/* Code and name */}
      <div>
        <h1 class="flex items-center">
          <span class="font-normal text-[32px] leading-none text-[#170b0b] w-3/4">
            {product.isVariantOf?.name} - {product.name}
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
          {installments && (
            <div>
              <span class="text-base font-normal text-[#757575]">ou</span>{" "}
              {installments}
            </div>
          )}
        </span>
      </div>
      {/* Sku Selector */}

      <div class="mt-4 sm:mt-6">
        <ProductSelector
          product={product}
          similars={similars}
          selectedID={selectedSku.value}
        />
      </div>
      <div>
        <ProductSizeTable category={productCategory!} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class=" border border-[#d2d2d2] mt-10 border-b" />
      <div class="mt-4 sm:mt-6 flex flex-col gap-2">

        {seller && inStock
          ? (
            <AddToCartButton
              skuId={productID}
              sellerId={seller}
              price={price ?? 0}
              discount={price && listPrice ? listPrice - price : 0}
              name={product.name ?? ""}
              productGroupId={product.isVariantOf?.productGroupID ?? ""}
            />
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {product.additionalProperty && (
            <ProductAdditionalDescription product={product} />
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
  const id = useId();
  const images = useStableImages(product);
  const openZoom = useSignal(false);

  /**
   * Product slider variant
   *
   * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
   * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
   * we rearrange each cell with col-start- directives
   */
  if (variant === "slider") {
    return (
      <div class="mx-3">
        <div class="py-3">
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          />
        </div>

        <div
          id={id}
          class="flex lg:flex-row flex-col max-w-[1140px] justify-center mt-2"
        >
          <div class="lg:w-7/12 w-full flex lg:flex-row flex-col lg:relative ">
            {/* Image Slider */}
            <div class="lg:absolute lg:right-0 sm:col-start-2 sm:col-span-1 sm:row-start-1 lg:w-5/6 w-full ">
              <Slider class="carousel max-w-[540px] mx-auto">
                {images.map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item cursor-pointer mx-auto"
                  >
                    <Image
                      onClick={() => openZoom.value = true}
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

              <Slider.PrevButton class="no-animation absolute left-0 lg:top-80 top-[500px]">
                <Icon size={20} id="ChevronLeft" strokeWidth={3} />
              </Slider.PrevButton>

              <Slider.NextButton
                class="no-animation absolute right-0 lg:top-80 top-[500px]"
                disabled={images.length < 2}
              >
                <Icon size={20} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
              {/* ModalZoom */}
              <div>
                <Modal
                  loading="lazy"
                  mode="center"
                  open={openZoom.value}
                  onClose={() => {
                    openZoom.value = false;
                  }}
                >
                  <div class="relative" id={id}>
                    <Slider class="carousel w-screen overflow-y-auto">
                      {images.map((image, index) => (
                        <Slider.Item index={index} class="carousel-item w-full">
                          <Image
                            style={{ aspectRatio: 1280 / 628 }}
                            src={image.url!}
                            alt={image.alternateName}
                            width={1280}
                            height={628}
                          />
                        </Slider.Item>
                      ))}
                    </Slider>

                    <Slider.PrevButton class="btn btn-circle btn-outline absolute left-8 top-[50vh]">
                      <Icon size={20} id="ChevronLeft" strokeWidth={3} />
                    </Slider.PrevButton>
                    <Slider.NextButton class="btn btn-circle btn-outline absolute right-8 top-[50vh]">
                      <Icon size={20} id="ChevronRight" strokeWidth={3} />
                    </Slider.NextButton>
                  </div>
                  <SliderJS rootId={id} />
                </Modal>
              </div>
            </div>
            {/* Dots */}
            <ul class="flex flex-row lg:gap-0 mt-3 gap-2 sm:justify-start overflow-auto px-4 sm:px-0 lg:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1 lg:w-2/12 w-full">
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
          </div>

          {/* Product Info */}
          <div class="sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1 lg:w-5/12 w-full">
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
