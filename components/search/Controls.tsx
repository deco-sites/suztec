import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import type { ProductListingPage,FilterToggleValue } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    ft?: string;
    pageInfo?: number;
    url: string;
  };

function SearchControls(
  { filters, breadcrumb, sortOptions, ft, pageInfo, url }: Props,
) {
  
  const verifyUrl = (): boolean => {
    return filters[0].values[0].url.includes("busca?") 
  }



  return (
    <div class="flex flex-col ">
      <div class="flex flex-row items-center py-3">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>
      <div class="pb-[15px]">
        <span class="font-extrabold text-[21px] uppercase">
          {ft ?? ""}
        </span>{" "}
        <span class="uppercase font-light text-base text-[#333]">
          PRODUTOS ENCONTRADOS:
        </span>{" "}
        <span class="font-extrabold ml-[5px]">{pageInfo}</span>
      </div>

      <div class="flex flex-row w-full items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
        {verifyUrl()
          ? <div>{sortOptions.length > 0 && <Sort />}</div>
          : (
            <div class="flex flex-row w-full">
              <Filters filters={filters} />
              {sortOptions.length > 0 && <Sort />}
            </div>
          )}
      </div>
    </div>
  );
}

export default SearchControls;
