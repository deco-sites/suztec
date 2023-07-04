import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import { useScroll } from "$store/sdk/useScroll.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;
  const scroll = useScroll();
  const top = scroll.value > 100 ? -28 : 0;

  return (
    <li
      class={scroll.value > 100
        ? "group flex items-center  mb-3"
        : "group flex items-center"}
    >
      <a
        href={href}
        class={scroll.value > 100 ? "py-[5px] px-[5px]" : "pb-[22px] pr-[30px]"}
      >
        <span class="text-base font-medium">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-[#eee] transition-all z-50 items-start  gap-6 border-t border-b-2 border-base-200 w-screen"
            style={{ top: top, left: "0px", marginTop: headerHeight }}
          >
            <div class="mx-[189px] py-[30px]">
              {image?.src && (
                <Image
                  class="p-6"
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={332}
                  loading="lazy"
                />
              )}
              <ul class="flex items-start justify-center gap-1">
                {children.map((node) => (
                  <li class="p-[15px]">
                    <a
                      class={scroll.value > 100
                        ? "h-12 font-medium"
                        : "font-medium"}
                      href={node.href}
                    >
                      <span>{node.label}</span>
                    </a>

                    <ul class="flex flex-col gap-1 mt-4">
                      {node.children?.map((leaf) => (
                        <li>
                          <a href={leaf.href}>
                            <span class="text-sm font-light">
                              {leaf.label}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
