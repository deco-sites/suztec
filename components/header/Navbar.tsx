import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

const navItems = [
  {
    href: "/",
    icon: "Map-marker",
    text: "Encontre nossas lojas",
    width: 10,
    height: 14,
  },
  { href: "/", icon: "Heart-filled", text: "Favoritos", width: 14, height: 14 },
  {
    href: "/",
    icon: "Gift-solid",
    text: "Meus Pedidos",
    width: 14,
    height: 14,
  },
  { href: "/", icon: "UserNav", text: "Minha Conta", width: 12, height: 14 },
  { href: "/", icon: "Cart-shopping", text: "Carrinho", width: 15, height: 14 },
];

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full px-[30px] gap-2"
      >
        <Buttons variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <Buttons variant="search" />
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex h-24 flex-row items-center border-b border-base-200 w-full px-[30px]">
        <div class="flex-none">
          {
            /* xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"
        xml:space="preserve"
        <metadata id="metadata8">
                        <rdf:rdf>
                          <cc:work rdf:about="">
                            <dc:format>image/svg+xml</dc:format>
                            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type>
                          </cc:work>
                        </rdf:rdf>
                      </metadata> */
          }
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 434.58667 204.25333"
              height="64"
              width="126"
              id="svg2"
              version="1.1"
            >
              <defs id="defs6"></defs>
              <g
                transform="matrix(1.3333333,0,0,-1.3333333,0,204.25333)"
                id="g10"
              >
                <g transform="scale(0.1)" id="g12">
                  <path
                    id="path14"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 1148.99,1075.83 h -94.71 v 373.76 H 916.836 v 80.42 h 369.284 v -80.42 h -137.13 v -373.76"
                  >
                  </path>
                  <path
                    id="path16"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 1414.59,1279.55 v -203.72 h -94.71 v 454.18 h 94.71 v -172.23 h 177.03 v 172.23 h 95.03 v -454.18 h -95.03 v 203.72 h -177.03"
                  >
                  </path>
                  <path
                    id="path18"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 2053.89,1449.66 h -238.44 v -95.49 h 210 v -80.35 h -210 V 1156.1 h 238.27 v -80.19 h -326.7 v 454.18 h 326.87 v -80.43"
                  >
                  </path>
                  <path
                    id="path20"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 281.16,1005.77 h 88.434 V 552.418 H 274.883 L 89.8477,875.715 H 88.5938 V 552.418 H 0 V 1005.77 H 99.7422 L 279.594,690.211 h 1.566 v 315.559"
                  >
                  </path>
                  <path
                    id="path22"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 630.488,620.555 c 51.047,0 122.989,31.648 122.989,158.566 0,126.832 -71.942,158.488 -122.989,158.488 -51.047,0 -123.3,-31.656 -123.3,-158.488 0,-126.918 72.253,-158.566 123.3,-158.566 m 0,397.315 c 60,0 217.86,-25.917 217.86,-238.749 0,-212.562 -157.86,-238.637 -217.86,-238.637 -60,0 -218.011,26.075 -218.011,238.637 0,212.832 158.011,238.749 218.011,238.749"
                  >
                  </path>
                  <path
                    id="path24"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 1516.7,552.418 h -94.72 V 925.742 H 1284.7 v 80.108 h 368.65 V 925.742 H 1516.7 V 552.418"
                  >
                  </path>
                  <path
                    id="path26"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="M 1782.15,755.719 V 552.418 h -94.56 v 453.432 h 94.56 V 834.172 h 176.87 v 171.678 h 94.87 V 552.418 h -94.87 v 203.301 h -176.87"
                  >
                  </path>
                  <path
                    id="path28"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 1091.97,806.219 c 49.17,0 73.2,17.117 73.2,61.961 0,23.879 -11,59.215 -66.45,59.215 H 980.609 V 806.219 Z M 887.777,1005.77 H 1117.1 c 120.63,0 142.63,-88.977 142.63,-128.165 0,-49.953 -25.45,-92.91 -70.22,-108.07 37.39,-16.336 57.65,-30.23 57.65,-114.898 0,-66.242 0,-82.735 20.1,-90.274 v -11.945 h -104.92 c -6.12,21.211 -10.06,44.777 -10.06,91.457 0,61.961 -3.6,85.84 -73.98,85.84 H 980.609 V 552.418 h -92.832 v 453.352"
                  >
                  </path>
                  <path
                    id="path30"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="M 668.504,15.0781 H 571.273 V 480.488 h 331.11 V 398.02 H 668.504 V 293.09 H 873.168 V 210.629 H 668.504 V 15.0781"
                  >
                  </path>
                  <path
                    id="path32"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 1004.64,191.32 h 118.43 l -57.65,184.078 h -1.09 z M 946.055,15.0781 H 843.637 L 1009.67,480.488 h 112.15 L 1285.8,15.0781 h -105.86 l -29.7,95.9609 H 978.57 L 946.055,15.0781"
                  >
                  </path>
                  <path
                    id="path34"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 1584.24,326.551 c -7.54,27.648 -22.78,80.269 -102.89,80.269 -46.65,0 -115.6,-31.101 -115.6,-162.73 0,-83.41 33.14,-158.8009 115.6,-158.8009 53.73,0 91.42,30.4729 102.89,87.4919 h 97.23 C 1661.99,71.7813 1596.02,1.10156 1479.31,1.10156 c -123.77,0 -212.67,83.55864 -212.67,244.41044 0,162.41 93.93,245.488 214.09,245.488 139.17,0 195.55,-95.961 200.74,-164.449 h -97.23"
                  >
                  </path>
                  <path
                    id="path36"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 2055.45,398.02 h -244.4 v -97.692 h 215.51 V 217.859 H 1811.05 V 97.2188 h 244.4 V 15.0781 H 1720.57 V 480.488 h 334.88 V 398.02"
                  >
                  </path>
                  <path
                    id="path38"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 370.066,133.98 h 23.715 c 20.262,0 38.645,1.11 38.645,24.192 0,19.476 -16.809,22.617 -32.203,22.617 h -30.157 z m -22.933,65.192 h 56.703 c 35.027,0 51.519,-13.82 51.519,-41.942 0,-26.55 -16.812,-37.539 -38.64,-40.05 L 458.652,52.4609 H 434.145 L 394.098,115.602 H 370.066 V 52.4609 H 347.133 Z M 396.141,18.5313 c 58.113,0 103.035,46.3398 103.035,107.7577 0,60.152 -44.922,106.492 -103.035,106.492 -58.75,0 -103.828,-46.34 -103.828,-106.492 0,-61.4179 45.078,-107.7577 103.828,-107.7577 m 0,232.7887 c 68.476,0 125.972,-54.191 125.972,-125.031 C 522.113,54.1914 464.617,0 396.141,0 327.34,0 269.539,54.1914 269.539,126.289 c 0,70.84 57.801,125.031 126.602,125.031"
                  >
                  </path>
                  <path
                    id="path40"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 2364.57,43.5 v 240.48 c 0,108.079 -87.8,195.879 -195.86,195.879 l -21.84,0.629 V 15.0781 h 218.02 V 43.5 h -0.32"
                  >
                  </path>
                  <path
                    id="path42"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="m 3259.26,43.5 v 397.559 c 0,601.321 -489.28,1090.601 -1090.55,1090.601 h -11.78 l 1.87,0.23 h -11.93 v -455.51 h 30.32 c 353.1,-4.64 642.42,-292.79 646.51,-646.778 l 0.16,-318.25 h -0.31 V 16.0195 h 435.87 V 43.5 h -0.16"
                  >
                  </path>
                  <path
                    id="path44"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    d="M 2755.06,28.2695 V 422.672 c -1.41,314.035 -252.26,570.621 -563.58,582.868 v 0.47 h -9.43 c -4.39,0.08 -8.48,0.7 -12.87,0.7 h -12.25 l 1.25,0.56 h -11.31 V 922.844 552.418 h 10.06 v -0.625 h 11.78 c 145.91,0 264.66,-118.754 264.66,-264.664 l -0.62,-271.1095 h 321.68 v 12.25 h 0.63"
                  >
                  </path>
                </g>
              </g>
            </svg>
          </a>
        </div>
        <div class="block w-full">
          <div class="flex justify-end items-center mt-[14px]">
            {navItems.map((item) => (
              <a
                class="flex px-[5px] text-sm font-medium items-center hover:underline"
                href={item.href}
                aria-label="Log in"
              >
                <Icon
                  id={item.icon}
                  width={item.width}
                  height={item.height}
                  class="mr-[5px]"
                />
                {item.text}
              </a>
            ))}
          </div>

          <div class="flex-none w-full flex justify-between gap-2 mt-5">
            <div class="flex">
              {items.map((item) => <NavItem item={item} />)}
            </div>
            <div class="mb-5 mt-[4px]">
              <Searchbar searchbar={searchbar} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
