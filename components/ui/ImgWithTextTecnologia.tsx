import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

export interface Props {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  /** @description Lado em que a imagem vai ficar na tela */
  imageSide?: "Esquerda" | "Direita";
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  title?: HTML;

  subTitle?: HTML;
  /**
   * @description Primeiro texto da section
   */

  firstText?: HTML;
  /**
   * @description Segundo texto da section
   */
  secondText?: HTML;
  /**
   * @description Botão 1 da section
   */
  buttonsActions1?: HTML;
  /**
   * @description Botão 2 da section
   */
  buttonsActions2?: HTML;
}

const ImgWithTextTecnologia = (
  {
    desktop,
    mobile,
    alt,
    preload,
    buttonsActions1 = "CONFIRA AQUI",
    buttonsActions2 = "PRODUTOS COMPLEMENTARES",
    title = "PLUMAS DE GANSO",
    subTitle = "ISOLAMENTO TÉRMICO DE ALTO DESEMPENHO",
    firstText =
      "As plumas de ganso são excelentes isolantes térmicos e, por possuírem vários níveis de densidade e capacidade térmica, podem ser usadas até mesmo em locais com climas extremos.",
    secondText =
      "Há muitos anos, nações em todo o mundo usam esse material para preencher jaquetas, cobertores, travesseiros e sacos de dormir, com a finalidade de promover aquecimento, conforto e proteção.",
  }: Props,
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
            <Markdown text={title} />
          </h1>
          <h2 class="mt-[10px] font-semibold text-lg">
            <Markdown text={subTitle} />
          </h2>
          <p class="pt-6 font-light text-base text-[#757575]">
          <Markdown text={firstText} />
          </p>
          <p class="pt-6 font-light text-base text-[#757575]">
            <Markdown text={secondText} />
          </p>
          <div class="flex flex-row gap-1 pt-6">
            <button class="btn rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] min-w-[114px] rounded-l-none text-white disabled:loading">
              <Markdown text={buttonsActions1} />
            </button>
            <button class="btn rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] min-w-[114px] rounded-l-none text-white disabled:loading">
              <Markdown text={buttonsActions2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgWithTextTecnologia;
