import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  label: HTML;
}

export interface Props {
  highlights?: Highlight[];
  title: HTML;
}

function Highlights({ highlights = [], title }: Props) {
  return (
    <div class="lg:px-[30px] px-[10px] grid grid-cols-1 grid-rows-[48px_1fr] py-4">
      <h2 class="text-center">
        <span class="font-medium text-[21px]">
          <Markdown text={title} />
        </span>
      </h2>

      <Slider class="h-full xl:max-w-[1860px] mx-auto w-full grid lg:grid-cols-4 grid-cols-2 grid-rows-1 gap-3 justify-center">
        {highlights.map(({ href, src, alt, label }, index) => (
          <Slider.Item
            index={index}
            class={`${
              (index == 2 || index == 3)
                ? " group  min-w-[190px] hidden lg:block"
                : "group  min-w-[190px]"
            }`}
          >
            <a href={href} class="bg-base-100 rounded-none card card-compact">
              <figure class="w-full">
                <Image
                  src={src}
                  alt={alt}
                  width={455}
                  height={553}
                />
              </figure>
              <div class="card-body items-center">
                <button class="font-light border border-black px-20 group-hover:text-white group-hover:bg-black transition-all ease-out duration-300">
                  <Markdown text={label} />
                </button>
              </div>
            </a>
          </Slider.Item>
        ))}
      </Slider>
    </div>
  );
}

export default Highlights;
