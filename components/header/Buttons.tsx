import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-square btn-ghost"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class=""
      variant="icon"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={26} height={26} strokeWidth={0.03} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || 0;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <a>
      <Button
        variant="icon"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading.value}
        onClick={onClick}
      >
        <div class="indicator relative px-[5px] hover:underline text-sm font-light items-center">
          <Icon
            class="mr-[5px]"
            id="Cart-shopping"
            width={15}
            height={14}
            strokeWidth={2}
          />
          <span class="w-[13px] block items-center h-[13px] rounded-full bg-black text-white leading-3 text-[10px] absolute bottom-3 left-[13px]">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
          <span>Carrinho</span>
        </div>
      </Button>
    </a>
  );
}

function CartButtonMobile() {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || 0;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <a>
      <Button
        variant="icon"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading.value}
        onClick={onClick}
      >
        <div class="indicator relative px-[5px] hover:underline text-sm font-light items-center">
          <Icon
            class="mr-[5px]"
            id="Cart-shopping"
            width={30}
            height={28}
            strokeWidth={2}
          />
          <span class="w-5 h-5 rounded-full bg-black text-white items-center text-[10px] absolute bottom-[22px] right-[3px]">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        </div>
      </Button>
    </a>
  );
}

function Buttons(
  { variant }: { variant: "cart" | "search" | "menu" | "cartMobile" },
) {
  if (variant === "cartMobile") {
    return <CartButtonMobile />;
  }
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default Buttons;
