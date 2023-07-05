import BannerDouble from "deco-sites/suztec/components/ui/BannerDouble.tsx";
import type { BannerDoubleProps } from "deco-sites/suztec/components/ui/BannerDouble.tsx";

export interface BannerDoubleContainerProps {
  bannerPrimary: BannerDoubleProps;
  bannerSecundary: BannerDoubleProps;
  percentualBanner1: 25 | 33 | 50 | 75
  percentualBanner2: 25 | 33| 50| 75
}

export default function BannerDobbleSection(props: BannerDoubleContainerProps) {

  return (
    <>
      <div class="text-white lg:flex gap-1 justify-center text-center lg:flex-row lg:px-[30px] py-[10px] px-[10px] 15xl:px-0">
        <div
          class={props.percentualBanner1 == 25
            ? "w-full lg:w-1/4"
            : props.percentualBanner1 == 33
            ? "w-full lg:w-2/6"
            : props.percentualBanner1 == 50
            ? "w-full lg:w-1/2"
            : "w-full lg:w-9/12"}
        >
          <BannerDouble {...props.bannerPrimary} />
        </div>
        <div
          class={props.percentualBanner2 == 25
            ? "mt-10 lg:mt-0 w-full lg:w-1/4"
            : props.percentualBanner2 == 33
            ? "mt-10 lg:mt-0 w-full lg:w-2/6"
            : props.percentualBanner2 == 50
            ? "mt-10 lg:mt-0 w-full lg:w-1/2"
            : "mt-10 lg:mt-0 w-full lg:w-9/12"}
        >
          <BannerDouble {...props.bannerSecundary} />
        </div>
      </div>
    </>
  );
}
