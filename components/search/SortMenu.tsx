import { useMemo } from "preact/hooks";
import type { FilterToggle } from "deco-sites/std/commerce/types.ts";

const options = [
  { value: "OrderByPriceASC", label: "Menor Preço" },
  { value: "OrderByPriceDESC", label: "Maior Preço" },
  { value: "OrderByNameASC", label: "A - Z" },
  { value: "OrderByNameDESC", label: "Z - A" },
  { value: "OrderByReleaseDateDESC", label: "Data de lançamento" },
  { value: "OrderByBestDiscountDESC", label: "Melhor Desconto" },
];

const SORT_QUERY_PARAM = "sort";

export const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM);
  }, []);

const applySort = (order: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const urlStr = urlSearchParams.toString();
  const indexOrder = urlStr.indexOf("O=OrderBy");
  const orderFilter = urlStr.substring(indexOrder + 2);
  const newUrl = urlStr.replace(orderFilter, order);
  window.location.search = newUrl;
};

interface Props {
  values?: FilterToggle["values"];
}

function SortMenu({ values }: Props) {
  const sort = useSort();

  return (
    <ul
      class="absolute z-10 border border-[#d2d2d2] bg-white w-full flex flex-col p-[10px] outline-none focus:outline-none"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-item-1"
    >
      {values
        ? (
          <div>
            {values.map((value) => (
              <li
                class="select-none relative flex py-1 justify-between items-center border-b-1 border-gray-menu "
                onClick={() => applySort(value.value)}
                role="option"
                aria-selected={value.value === sort}
                id={`listbox-item-${value.label}`}
              >
                <div class="flex items-center w-full">
                  <span class="w-full leading-none cursor-pointer text-[11px] text-[#424242] font-bold">
                    {value.label}
                  </span>
                </div>
              </li>
            ))}
          </div>
        )
        : (
          <div>
            {options.map((option, index) => (
              <li
                class="select-none relative flex py-1 justify-between items-center border-b-1 border-gray-menu "
                onClick={() => applySort(option.value)}
                role="option"
                aria-selected={option.value === sort}
                id={`listbox-item-${index}`}
              >
                <div class="flex items-center w-full">
                  <span class="w-full leading-none cursor-pointer text-[11px] text-[#424242] font-bold">
                    {option.label}
                  </span>
                </div>
              </li>
            ))}
          </div>
        )}
    </ul>
  );
}

export default SortMenu;
