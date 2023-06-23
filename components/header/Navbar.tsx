import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Logo from "./Logo.tsx";

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
        class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full px-[30px] gap-2"
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
      <div class="hidden lg:flex h-24 flex-row items-center border-b border-base-200 w-full lg:px-3 xl:px-[30px]">
        <div class="flex-none">
          <a href="/">
            <Logo />
          </a>
        </div>
        <div class="block w-full">
          <div class="flex justify-end items-center mt-5">
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
          </div>

          <div class="flex-none w-full flex justify-between gap-2 mt-3">
            <div class="flex ml-3">
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
