import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    ft?: string;
    pageInfo?: number;
    url: URL;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions, ft, pageInfo, url }: Props,
) {
  const urlStr = url.toString();
  const verifyUrl = (url: string): boolean => {
    return url.includes("busca?");
  };

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

      <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
        {verifyUrl(urlStr)
          ? <div>{sortOptions.length > 0 && <Sort />}</div>
          : (
            <div class="flex flex-row">
              <Filters filters={filters} />
              {sortOptions.length > 0 && <Sort />}
            </div>
          )}
      </div>
    </div>
  );
}

export default SearchControls;
