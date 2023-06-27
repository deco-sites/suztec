import BannerDouble from "deco-sites/suztec/components/ui/BannerDouble.tsx";
import type { BannerDoubleProps } from "deco-sites/suztec/components/ui/BannerDouble.tsx";

export interface BannerDoubleContainerProps {
  bannerPrimary: BannerDoubleProps;
  bannerSecundary: BannerDoubleProps;
}

export default function BannerDobbleSection(props: BannerDoubleContainerProps) {
  return (
    <>
      <div class="text-white lg:flex gap-1 justify-center text-center lg:flex-row lg:px-[30px] py-[10px] px-[10px] 15xl:px-0">
        <div class="w-full lg:w-1/2">
          <BannerDouble {...props.bannerPrimary} />
        </div>
        <div class="mt-10 lg:mt-0 lg:w-1/2 w-full">
          <BannerDouble {...props.bannerSecundary} />
        </div>
      </div>
    </>
  );
}
