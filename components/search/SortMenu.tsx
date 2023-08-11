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
  const indexOrder = urlStr.indexOf("OrderBy");
  const orderFilter = urlStr.substring(indexOrder);
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
      class="absolute z-10 border border-[#d2d2d2] bg-white w-full flex flex-col py-[10px] pr-[10px] pl-[5px] outline-none focus:outline-none"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-item-1"
    >
      {values
        ? (
          <div>
            {values.map((value) => (
              <li
                class="select-none relative flex py-1 cursor-pointer justify-between items-center border-b-1 border-gray-menu "
                onClick={() => value.selected = !value.selected}
                role="option"
                aria-selected={value.value === sort}
                id={`listbox-item-${value.label}`}
              >
                <a href={value.url} class="flex flex-row items-center">
                  {value.selected
                    ? (
                      <span>
                        <img
                          src="https://thenorthface.vteximg.com.br/arquivos/checkbox_checked.png?v=1333"
                          width={13}
                          height={13}
                        />
                      </span>
                    )
                    : (
                      <span>
                        <img
                          src="https://thenorthface.vteximg.com.br/arquivos/checkbox_unchecked.png?v=122"
                          width={13}
                          height={13}
                        />
                      </span>
                    )}

                  <span class="w-full leading-none cursor-pointer text-[11px] ml-[5px] uppercase text-[#424242] font-bold">
                    {value.label}
                  </span>
                </a>
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
