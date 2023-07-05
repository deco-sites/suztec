import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";

const footerIcons = [
  { href: "#", icon: "Instagram", width: 22, height: 26 },
  { href: "#", icon: "Facebook", width: 22, height: 26 },
  {
    href: "#",
    src:
      "https://thenorthface.vteximg.com.br/arquivos/Blog.png?v=637262729475600000",
    width: 25,
    height: 18,
  },
  { href: "#", icon: "Youtube", width: 29, height: 26 },
  { href: "#", icon: "Linkedin", width: 22, height: 26 },
  { href: "#", icon: "Spotify", width: 25, height: 26 },
  {
    href: "#",
    src:
      "https://www.thenorthface.com.br/arquivos/gplus.png?v=637359724387400000",
    width: 22,
    height: 24,
  },
];

export interface Props {
  text1: HTML;
  /** @title Title 1 */
  text2: HTML;
  /** @title Title 2 */
  text3: HTML;
  /** @title Title 3 */
  buttonText: HTML;
  /** @title Texto do botão */
  placeHolder: string;
  /** @title Placeholder input email */
  bgButton?: string;
  /** @title Cor do botão */
}

const FooterAtt = (
  { text1, text2, text3, placeHolder, buttonText, bgButton }: Props,
) => {
  <ul class="lg:flex  gap-10 w-full text-black items-center">
    <li class="block text-center mx-auto  w-full lg:w-[380px]">
      <span class="items-center text-black font-medium text-sm ">
        <Markdown text={text1} />
      </span>
      <div>
        <button class="btn rounded-none w-full lg:w-[352px] tracking-[0.5px] text-white disabled:loading mt-7">
          {buttonText}
        </button>
      </div>
    </li>
    <li class="block text-center mx-auto  w-full lg:w-[380px] lg:mt-0 mt-14">
      <span class="items-center text-black font-medium text-sm">
        <Markdown text={text2} />
      </span>
      <ul class="flex items-center justify-between gap-2 mt-[38px] mb-3">
        {footerIcons.map((icon) => (
          <li>
            <a
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram logo"
            >
              {icon.icon
                ? (
                  <Icon
                    class="text-black"
                    width={icon.width}
                    height={icon.height}
                    id={icon.icon}
                    strokeWidth={1}
                  />
                )
                : (
                  <img
                    src={icon.src}
                    width={icon.width}
                    height={icon.height}
                  />
                )}
            </a>
          </li>
        ))}
      </ul>
    </li>
    <li class="block text-center mx-auto w-full lg:w-[380px] lg:mt-0 mt-14">
      <span class="items-center font-medium text-black text-sm">
        <Markdown text={text3} />
      </span>
      <div class="w-full lg:max-w-[380px] mt-[30px] mx-auto ">
        <Newsletter
          buttonText={buttonText}
          placeHolder={placeHolder}
        />
      </div>
    </li>
  </ul>;
};

export default FooterAtt;
