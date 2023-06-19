import Image from "deco-sites/std/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  label: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Highlights({ highlights = [], title }: Props) {
  return (
    <div class="px-[30px] grid grid-cols-1 grid-rows-[48px_1fr] py-4">
      <h2 class="text-center">
        <span class="font-medium text-2xl">{title}</span>
      </h2>

      <Slider class="carousel h-full w-full carousel-center sm:carousel-end gap-3 justify-center">
        {highlights.map(({ href, src, alt, label }, index) => (
          <Slider.Item
            index={index}
            class=" w-[358px] h-[512px] group first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0 min-w-[190px]"
          >
            {/* class="card card-compact" */}
            <a href={href} class="bg-base-100">
              <figure>
                <Image
                  src={src}
                  alt={alt}
                  width={358}
                  height={435}
                />
              </figure>
              <div class="card-body items-center">
                <button class="font-medium border border-black px-20 group-hover:text-white group-hover:bg-black transition-all ease-out duration-300">
                  {label}
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
