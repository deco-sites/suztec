import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { useScroll } from "$store/sdk/useScroll.ts";

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
  // { variant:"cart" href: "/", icon: "Cart-shopping", text: "Carrinho", width: 15, height: 14 },
];

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  const scroll = useScroll();
  return (
    <>
      {/* Mobile Version */}
      <div
        class="lg:hidden fixed top-0 bg-white block items-center border-b border-base-200 w-full p-4 gap-2"
        style={{ height: navbarHeight }}
      >
        <div class="items-center flex justify-between w-full">
          <Buttons variant="menu" />

          <a
            href="/"
            aria-label="Store logo"
          >
            <Icon id="Logo" width={95} height={46} />
          </a>

          <Buttons variant="cartMobile" />
        </div>
        <div class="mt-4">
          <Searchbar searchbar={searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex h-24 flex-row items-center border-b border-base-200 w-full lg:px-3 xl:px-[30px]">
        <div class="w-1/12 xl:mr-2">
          <a href="/">
          <Icon id="Logo" width={126} height={60} />
          </a>
        </div>
        <div class="block w-full">
          <div class="flex justify-end items-center mt-3">
            {/* TODO: Trocar isso para <buttons /> */}
            {navItems.map((item) => (
              <a
                class="flex px-[5px] text-sm font-light items-center hover:underline"
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
            <Buttons variant="cart" />
          </div>

          <div class="w-full flex justify-between mt-3">
            <div class="flex lg:ml-14 xl:ml-3 w-3/4">
              {items.map((item) => <NavItem item={item} />)}
            </div>
            <div class="mb-5 w-1/6 md:mr-4 lg:mr-0">
              <Searchbar searchbar={searchbar} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
