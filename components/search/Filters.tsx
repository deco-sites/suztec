import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
import Sort from "./Sort.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle" && filter.key != "Brands" &&
  filter.key != "Departments";

function Filters({ filters }: Props) {
  console.log(filters)
  return (
    <ul class="flex flex-row mb-[10px] w-full">
      {filters
        .filter(isToggle)
        .map((filter) => <Sort filter={filter} />)}
    </ul>
  );
}

export default Filters;
