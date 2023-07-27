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
  filter["@type"] === "FilterToggle";


function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-row">
      {filters
        .filter(isToggle)
        .map((filter) => <Sort filter={filter} />)}
    </ul>
  );
}

export default Filters;
