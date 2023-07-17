import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];
  console.log(items)

  return (
  <div class="text-base text-[#353535] font-semibold breadcrumbs no-underline">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li>
              <a href={item}>{name?.toUpperCase()}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
