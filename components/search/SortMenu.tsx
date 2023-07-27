import { useMemo } from "preact/hooks";
import type { FilterToggle } from "deco-sites/std/commerce/types.ts";

const options = [
  { value: "price:asc", label: "Menor Preço" },
  { value: "price:desc", label: "Maior Preço" },
  { value: "orders:desc", label: "Mais vendidos" },
  { value: "name:asc", label: "A - Z" },
  { value: "name:desc", label: "Z - A" },
  { value: "release:desc", label: "Data de lançamento" },
  { value: "discount:desc", label: "Melhor Desconto" },
];

const SORT_QUERY_PARAM = "sort";

export const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM);
  }, []);

const applySort = (value: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set(SORT_QUERY_PARAM, value);
  window.location.search = urlSearchParams.toString();
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
