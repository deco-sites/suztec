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
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  text?: HTML;

  /**
   * @description Titulo da lista
   */
  titleList?: HTML;
  /**
   * @description Elementos da lista
   */
  itemsList?: HTML[];
  /**
   * @description Botão da section
   */
  buttonAction?: HTML;
}

const ImgWithListTecnologia = (
  {
    desktop,
    mobile,
    alt,
    preload,
    buttonAction = "PRODUTOS",
    titleList = "BENEFÍCIOS",
    itemsList = [],
    text =
      "Na The North Face, nossa cadeia é certificada com o selo Responsible Down Standart, que auditora e garante que os animais são cuidados o tempo todo. As plumas usadas em produtos da nossa marca são aquelas que caem naturalmente dos gansos, ou seja, não são retiradas à força. Também existe a preocupação com o bem-estar dessas aves, que não podem ser alimentadas de forma forçada e, muito menos, maltratadas.",
  }: Props,
) => {
  return (
    <div class="max-w-[1120px] mx-auto py-[30px] px-[10px]">
      <div class="flex lg:flex-row flex-col justify-between w-full lg:p-0 p-[10px]">
        <div class="w-full lg:w-1/2">
          <p class="font-light text-base text-[#757575]">
            <Markdown text={text} />
          </p>
          <h2 class="pt-6">{titleList}</h2>
          <ul class="pt-6">
            {itemsList.map((item) => (
              <li>
                <Markdown text={item} />
              </li>
            ))}
          </ul>
          <div class="flex flex-row gap-1 pt-6">
            <button class="btn px-16 rounded-r-[1px] hover:opacity-80 opacity-100 text-base font-normal traking-[0.5px] min-w-[114px] rounded-l-none text-white disabled:loading">
              <Markdown text={buttonAction} />
            </button>
          </div>
        </div>
        <div class="lg:max-w-[500px] lg:max-h-[381px] mt-[30px] lg:mt-0">
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
      </div>
    </div>
  );
};

export default ImgWithListTecnologia;
