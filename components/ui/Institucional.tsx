import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

export interface detailsServiceProps {
  title: HTML;
  texts: HTML[];
}

export interface Props {
  consumerService: HTML;
  consumerServices: HTML[];
  serviceTitle: HTML;
  detailsService: detailsServiceProps[];
}

const Institucional = (
  {
    consumerService = "SERVÇO AOS CONSUMIDORES",
    consumerServices = [],
    serviceTitle = " ",
    detailsService = [],
  }: Props,
) => {
  return (
    <div class="flex flex-row ml-[45px]">
      <div class="min-w-[450px] text-right mt-10 ml-[10px] pr-[50px]">
        <h2 class="text-2xl font-extrabold uppercase mb-[10px]">
          <Markdown text={consumerService} />
        </h2>
        <ul>
          {consumerServices.map((item) => (
            <li class="mt-[15px] text-base font-bold hover:underline">
              <Markdown text={item} />
            </li>
          ))}
        </ul>
      </div>
      <div class="max-w-[625px] mt-10">
        <h2 class="text-2xl font-extrabold uppercase mb-[50px]">
          <Markdown text={serviceTitle} />
        </h2>
        {detailsService.map((detail) => (
          <div>
            <h3>
              <Markdown text={detail.title} />
            </h3>
            {detail.texts.map((text) => (
              <p class="mt-[20px] text-sm font-light">
                <Markdown text={text} />
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Institucional;
