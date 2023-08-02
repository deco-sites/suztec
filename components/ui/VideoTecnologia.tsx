import Icon from "$store/components/ui/Icon.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  /** @description Lado em que a imagem vai ficar na tela */
  preload?: boolean;
  title?: HTML;
  text?: HTML;
}

const VideoTecnologia = ({
  desktop,
  mobile,
  alt,
  preload,
  title = "PLUMA DE GANSO:",
  text ="As plumas de ganso são excelentes isolantes térmicos. Na The North Face, nossa cadeia é certificada com o selo Responsible Down Standart, que auditora e garante que os animais são cuidados o tempo todo.",
}: Props) => {
  return (
    <div class="max-w-[1140px] mx-auto py-[30px] px-[10px]">
      <div class="flex lg:flex-row flex-col max-h-[267px] lg:p-0 p-[10px]">
        <a class="relative lg:w-1/3 w-full cursor-pointer">
          <span class="absolute z-99 top-[40%] left-[45%] lg:top-[37%] lg:left-[40%] bg-white rounded-full p-3 px-4 opacity-60 hover:opacity-80 transition-all ease-in-out duration-200">
            <Icon id="Play" width={40} height={50} />
          </span>
          <div class="lg:max-w-[376px] lg:max-h-[267px]">
            <Picture preload={preload}>
              <Source
                media="(max-width: 1024px)"
                fetchPriority={preload ? "high" : "auto"}
                src={mobile}
                width={463}
                height={328}
              />
              <Source
                media="(min-width: 1025px)"
                fetchPriority={preload ? "high" : "auto"}
                src={desktop}
                width={376}
                height={267}
              />
              <img
                class="object-cover w-full"
                loading={preload ? "eager" : "lazy"}
                src={desktop}
                alt={alt}
              />
            </Picture>
          </div>
        </a>
        <div class="items-center w-full lg:w-8/12 bg-[#2a2a2a] ">
          <div class="lg:px-0 px-[30px] mx-0 lg:mx-auto py-12 lg:py-16 max-h-[200px] lg:max-h-[267px] text-white max-w-[470px]">
            <span class="uppercase font-bold text-sm ">
              <Markdown text={title} />
            </span>
            <p class="mt-[15px] font-normal text-sm">
              <Markdown text={text} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTecnologia;
