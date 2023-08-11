import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";
import { useSignal } from "@preact/signals";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || 0;
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const open = useSignal(false);

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6">
        <Icon id="CartArrowDown" width={44} height={44} />
        <span class="font-normal text-base">
          Seu carrinho ainda não tem nenhum produto.
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Cart Items */}
      <ul
        role="list"
        class="mt-6 px-[13px] flex-grow overflow-y-auto flex flex-col gap-6"
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer>
        <div class="w-full mx-auto">
          <details class="px-[21px] pt-4 pb-1">
            <summary class="font-semibold flex justify-center px-4 py-2 text-lg cursor-pointer list-none">
              <Icon id="ChevronUp" width={20} height={20} strokeWidth={4} />
            </summary>

            <div class="flex justify-between items-center pb-5">
              <span>Código do vendedor</span>
              <input class="border border-black " />
            </div>
            <div class="flex justify-between items-center pb-5">
              <span>Cupom de desconto</span>
              <input class="border border-black" />
            </div>
            <div class="flex justify-between items-center pb-5">
              <span>CEP</span>
              <input class="border border-black" />
            </div>
          </details>
        </div>

        {/* Total */}
        {total?.value && (
          <div class="border-t border-base-200 py-3 px-2 flex flex-col justify-end items-end gap-4 mx-[21px] bg-[#757575] bg-opacity-20">
            <div class="flex justify-between items-center w-full ">
              <span class="leading-none">Subtotal:</span>
              <span class="font-medium text-base leading-none">
                {formatPrice(total.value / 100, currencyCode!, locale)}
              </span>
            </div>
            <div class="flex justify-between items-center w-full ">
              <span class="leading-none">Frete:</span>
              <span class="font-medium text-base leading-none">
                R$ 0,00
              </span>
            </div>
            <div class="flex justify-between items-center w-full ">
              <span class="leading-none">Itens: {totalItems}</span>
              <span class="font-normal text-sm leading-none">
                Total:{" "}
                <span class="font-bold text-lg leading-none">
                  {formatPrice(total.value / 100, currencyCode!, locale)}
                </span>
              </span>
            </div>
          </div>
        )}
        <div class="p-4 flex flex-row gap-2">
          <a class="inline-block w-full" href="/">
            <button
              data-deco="buy-button"
              class="btn rounded-r-[1px] hover:bg-white border border-black bg-white text-base font-normal traking-[0.5px] w-full rounded-l-none text-black"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total?.value
                      ? (total?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              CONTINUAR COMPRANDO
            </button>
          </a>
          <a class="inline-block w-full" href="/checkout">
            <button
              data-deco="buy-button"
              class="btn rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] w-full rounded-l-none text-white"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total?.value
                      ? (total?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              FINALIZAR COMPRA
            </button>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Cart;
