import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import MobileMenu from "$store/components/ui/MobileMenu.tsx";
import Alert from "./Alert.tsx";
import { useScroll } from "../../sdk/useScroll.ts";
import Navbar from "./Navbar.tsx";
import NavBarScroll from "./NavBarScroll.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  alerts: string[];

  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header(
  {
    alerts,
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };

  const scroll = useScroll();

  return (
    <>
      <header style={{ height: headerHeight }}>
        <div class="bg-base-100 relative w-full z-50">
          <div class="w-full bg-white top-0">
            <Navbar items={navItems} searchbar={searchbar} />
          </div>
          <div
            class={scroll.value > 100
              ? "fixed w-full top-0 bg-white transition-all duration-300"
              : "hidden"}
          >
            <NavBarScroll items={navItems} searchbar={searchbar} />
          </div>
          
        </div>

        <MobileMenu />

        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
