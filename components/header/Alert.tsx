import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

export interface Props {
  alerts: HTML[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  bgColor?: string;
  /**
   * @title Cor da tarja
   */
  linkText?: HTML;
  /**
   * @title Texto do Link
   */
  linkHref?: string;
  /**
   * @title Href do link
   */
}

function Alert(
  { alerts = [], interval = 5, bgColor = "black", linkText, linkHref }: Props,
) {
  const id = useId();

  return (
    <div id={id} class="relative">
      <Slider
        class="carousel carousel-center gap-6 scrollbar-none"
        style={`background-color: ${bgColor} `}
      >
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-white flex justify-center items-center font-light leading-5 w-screen h-[36px]">
              <Markdown text={alert} />
              {linkText && (
                <a
                  href={linkHref}
                  class="hover:underline ml-1 cursor-pointer"
                >
                  <Markdown text={linkText} />
                </a>
              )}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
