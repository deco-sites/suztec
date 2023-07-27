import { useEffect, useRef, useState } from "preact/hooks";
import ProductCard from "deco-sites/suztec/components/product/ProductCard.tsx";
import { computed } from "@preact/signals";
import type { Props } from "deco-sites/suztec/sections/ProductGallery.tsx";
import SearchControls from "deco-sites/suztec/components/search/Controls.tsx";
import { selectQuantityCardsToViewSignal } from "deco-sites/suztec/components/search/SelectQuantityCardsToView.tsx";
import { Runtime } from "../../runtime.ts";
import Spinner from "../ui/Spinner.tsx";
import { Product } from "https://denopkg.com/deco-sites/std@1.12.3/commerce/types.ts";

interface Options {
  page: NonNullable<Props["page"]>;
  loaderProps: Props["loaderProps"];
  url: URL;
}

const usePaginationController = ({ page, loaderProps, url }: Options) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState([page]);
  const { breadcrumb, pageInfo, filters, sortOptions } = page;
  const [loading, setLoading] = useState(false);
  const hasNextPage = Boolean(pages[pages.length - 1]?.pageInfo?.nextPage);
  const ft = url.searchParams.get("ft")?.split("?")[0];

  useEffect(() => {
    let cancel = false;

    if (!ref.current || !hasNextPage) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry?.isIntersecting) {
        try {
          const cursor = pages.length + (loaderProps.pageOffset || 0);

          const url = new URL(window.location.href);
          url.searchParams.set("page", cursor.toString());

          setLoading(true);
          const maybePage = await Runtime.invoke({
            key: "deco-sites/suztec/loaders/plp.ts",
            props: { ...loaderProps, url: url.href },
          });

          // Prevent self-ddos
          if (
            maybePage && !cancel && maybePage.products &&
            maybePage.products.length > 0
          ) {
            setPages((pages) => [...pages, maybePage]);
          }
        } catch (error) {
          console.info("Failed to fetch more products with error", error);
        } finally {
          !cancel && setLoading(false);
        }
      }
    });

    observer.observe(ref.current);

    return () => {
      cancel = true;
      observer.disconnect();
    };
  }, [pages.length, hasNextPage]);

  return {
    pages,
    loading,
    ref,
    breadcrumb,
    pageInfo,
    loaderProps,
    ft,
    filters,
    sortOptions,
    url,
  };
};

export default function Gallery(props: Options) {
  useEffect(() => {
    if (pages[0].products.length == 0) {
      window.location.href = "/buscavazia" + window.location.search;
    }
  }, []);

  const gridCols = computed(() => selectQuantityCardsToViewSignal.value);
  const {
    pages,
    loading,
    ref,
    breadcrumb,
    pageInfo,
    ft,
    filters,
    sortOptions,
    url,
  } = usePaginationController(
    props,
  );

  return (
    <div class="max-w-[1140px] mx-auto">
      <div>
        <SearchControls
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={true}
          sortOptions={sortOptions}
          pageInfo={pageInfo.records}
          ft={ft}
          url={url}
        />
      </div>
      <div
        class={`grid grid-cols-${gridCols.value.mobile} lg:grid-cols-${gridCols.value.desktop} gap-2 lg:gap-5 items-start`}
      >
        {pages.map((page) =>
          page.products.map((product: Product) => (
            <div class="w-full  ">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      <div
        ref={ref}
        class={[
          loading ? "visible" : "invisible",
          "grid place-items-center w-full  my-16",
          "text-[#252526] tracking-[1px] font-semibold overflow-hidden capitalize text-[14px] 15xl:text-[16px] min-h-[50px]",
        ].join(" ")}
      >
        <Spinner />
      </div>
    </div>
  );
}
