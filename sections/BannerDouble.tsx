import BannerDouble from "deco-sites/suztec/components/ui/BannerDouble.tsx";
import type { BannerDoubleProps } from "deco-sites/suztec/components/ui/BannerDouble.tsx";

export interface BannerDoubleContainerProps {
  bannerPrimary: BannerDoubleProps;
  bannerSecundary: BannerDoubleProps;
}

export default function BannerDobbleSection(props: BannerDoubleContainerProps) {
  return (
    <>
      <div class="text-white flex-col gap-1 justify-center text-center lg:(flex-row px-[30px] py-[10px]) 15xl:px-0">
        <BannerDouble {...props.bannerPrimary} />
        <BannerDouble {...props.bannerSecundary} />
      </div>
    </>
  );
}
