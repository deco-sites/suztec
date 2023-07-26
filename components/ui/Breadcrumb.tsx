import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="text-base text-[#353535] font-semibold">
      <ul class="flex flex-row items-start">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, i) => (
            <li>
              {i === (items.length - 1)
                ? <a href={item}>{name?.toUpperCase()}</a>
                :<div> <a href={item}>{name?.toUpperCase()}{"  "}</a><span class="mr-1 ml-[6px]">/</span></div>}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
