import { signal } from "@preact/signals";

export const selectQuantityCardsToViewSignal = signal({
  desktop: 4,
  mobile: 2,
});

export default function SelectQuantityCardsToView() {
  const buttonsStyles = `w-[7px] h-[16px] block rounded-[2px]`;

  return (
    <>
      <div class="flex ml-[18%] sm:ml-[23%] gap-4 cursor-pointer lg:ml-0">
        <div
          id="viewTreeCards"
          class={`hidden lg:(w-[24px] flex justify-center items-center ${
            selectQuantityCardsToViewSignal.value.desktop === 3
              ? "children:(bg-[#252526] border-none)"
              : null
          } children:(border-[#c5c7cc] border-1 m-auto) hover:children:(bg-[#252526] border-0))`}
          onClick={() =>
            selectQuantityCardsToViewSignal.value = { desktop: 3, mobile: 0 }}
        >
          <span class="w-[7px] h-[16px] block rounded-[2px]"></span>
          <span class="w-[7px] h-[16px] block rounded-[2px]"></span>
          <span class="w-[7px] h-[16px] block rounded-[2px]"></span>
        </div>

        <div
          id="viewFuorCards"
          class={`hidden lg:(w-[32px] flex justify-center items-center children:(border-[#c5c7cc] border-1 m-auto) hover:children:(bg-[#252526] border-0) ${
            selectQuantityCardsToViewSignal.value.desktop === 4
              ? "children:(bg-[#252526] border-none)"
              : null
          })`}
          onClick={() =>
            selectQuantityCardsToViewSignal.value = { desktop: 4, mobile: 0 }}
        >
          <span class={buttonsStyles}></span>
          <span class={buttonsStyles}></span>
          <span class={buttonsStyles}></span>
          <span class={buttonsStyles}></span>
        </div>

        <div
          id="viewOneCards"
          class={`w-[18px] flex justify-center items-center ${
            selectQuantityCardsToViewSignal.value.mobile === 1
              ? "children:(bg-[#252526] border-none)"
              : null
          } children:(border-[#c5c7cc] border-1 m-auto) hover:children:(bg-[#252526] border-0) lg:hidden`}
          onClick={() =>
            selectQuantityCardsToViewSignal.value = { desktop: 0, mobile: 1 }}
        >
          <span class="w-[18px] h-[20px] block rounded-[2px]"></span>
        </div>
        <div
          id="viewTwoCards"
          class={`w-[20px] flex justify-center items-center ${
            selectQuantityCardsToViewSignal.value.mobile === 2
              ? "children:(bg-[#252526] border-none)"
              : null
          } children:(border-[#c5c7cc] border-1 m-auto) hover:children:(bg-[#252526] border-0) lg:hidden`}
          onClick={() =>
            selectQuantityCardsToViewSignal.value = { desktop: 0, mobile: 2 }}
        >
          <span class={buttonsStyles}></span>
          <span class={buttonsStyles}></span>
        </div>
      </div>
    </>
  );
}
