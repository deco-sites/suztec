import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
// import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import ProductCard from "deco-sites/suztec/components/product/ProductCard.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  variant,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  return (
    <>
      <div class="container px-4 sm:py-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={variant === "drawer"}
        />

        <div class="flex flex-row">
          {variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          {
            /* <div class="flex-grow">
            <ProductGallery products={products} />
          </div> */
          }
          {products && (
            <div class="flex flex-col justify-between lg:pt-6 md:pt-0 gap-[10px] overflow-x-hidden md:w-[75%] border-none">
              <div class="flex justify-between gap-[10px] flex-wrap">
                {products.map((
                  product,
                  index,
                ) => {
                  if (index < 6) {
                    return (
                      <div
                        class={`min-w-[calc(50%-10px)] max-w-[calc(50%-10px)] lg:min-w-[300px]! lg:max-w-[300px]! 15xl:min-w-[400px]! 15xl:max-w-[400px]! mt-[42px] ${
                          index >= 3 ? "lg:hidden" : ""
                        }`}
                      >
                        <ProductCard isShelve={true} product={product} />
                      </div>
                    );
                  } else return;
                })}
              </div>
            </div>
          )}
        </div>

        <div class="flex justify-center my-4">
          <div class="btn-group">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost">
              Page {pageInfo.currentPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost"
            >
              <Icon
                id="ChevronRight"
                width={20}
                height={20}
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
