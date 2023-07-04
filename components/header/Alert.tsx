import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="relative" >
      <Slider class="carousel carousel-center bg-black gap-6 scrollbar-none">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-white flex justify-center items-center font-light leading-5 w-screen h-[36px]">
              {alert}
              <a
                href="/busca?O=OrderByReleaseDateDESC"
                class="hover:underline ml-1"
              >
                SHOP NOW!
              </a>
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
