import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

const ImgWithTextTecnologia = (
  { desktop, mobile, alt, preload }: Props,
) => {
  return (
    <div class="max-w-[1120px] mx-auto py-[30px] px-[10px]">
      <div class="flex flex-row items-center">
        <div class="max-w-[500px] max-h-[381px]">
          <Picture preload={preload}>
            <Source
              media="(max-width: 1024px)"
              fetchPriority={preload ? "high" : "auto"}
              src={mobile}
              width={500}
              height={381}
            />
            <Source
              media="(min-width: 1025px)"
              fetchPriority={preload ? "high" : "auto"}
              src={desktop}
              width={500}
              height={381}
            />
            <img
              class="object-cover w-full"
              loading={preload ? "eager" : "lazy"}
              src={desktop}
              alt={alt}
            />
          </Picture>
        </div>
        <div class="pl-[60px]">
          <h1 class="font-semibold text-[28px] leading-none">
            PLUMAS DE GANSO
          </h1>
          <h2 class="mt-[10px] font-semibold text-lg">
            ISOLAMENTO TÉRMICO DE ALTO DESEMPENHO
          </h2>
          <p class="pt-6 font-light text-base text-[#757575]">
            As plumas de ganso são excelentes isolantes térmicos e, por
            possuírem vários níveis de densidade e capacidade térmica, podem ser
            usadas até mesmo em locais com climas extremos.
          </p>
          <p class="pt-6 font-light text-base text-[#757575]">
            Há muitos anos, nações em todo o mundo usam esse material para
            preencher jaquetas, cobertores, travesseiros e sacos de dormir, com
            a finalidade de promover aquecimento, conforto e proteção.
          </p>
          <div class="flex flex-row gap-1 pt-6">
            <button class="btn rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] min-w-[114px] rounded-l-none text-white disabled:loading">
              CONFIRA AQUI
            </button>
            <button class="btn rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] min-w-[114px] rounded-l-none text-white disabled:loading">
              PRODUTOS COMPLEMENTARES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgWithTextTecnologia;
