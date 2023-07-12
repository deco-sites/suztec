import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Logo from "./Logo.tsx";

const navItems = [
  {
    href: "/",
    icon: "Map-marker",
    width: 10,
    height: 14,
  },
  { href: "/", icon: "Heart-filled", width: 14, height: 14 },
  {
    href: "/",
    icon: "Gift-solid",
    width: 14,
    height: 14,
  },
  { href: "/", icon: "UserNav", width: 12, height: 14 },
 
];

function NavBarScroll({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  
  return (
    <>
      <div
        class="hidden lg:flex z-[999] transform-y-full ease-in-out transition duration-200  h-24 flex-row items-center border-b border-base-200 w-full lg:px-3 xl:px-[30px]"
        style={{ height: "72px" }}
      >
        <div class="flex-none">
          <a href="/">
            <Logo width={80} height={50} />
          </a>
        </div>

        <div class="w-full flex justify-between mt-3 items-center">
          <div class="flex ml-6">
            {items.map((item) => <NavItem item={item} />)}
          </div>
          <div class="flex items-center mb-8">
            <div class="max-w-[243px] mr-3">
              <Searchbar searchbar={searchbar} />
            </div>
            <div class="flex justify-end items-center">
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
                  
                </a>
              ))}
              <Buttons variant="cart" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBarScroll;
