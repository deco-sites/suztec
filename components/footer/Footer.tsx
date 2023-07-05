import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";
import type { ComponentChildren } from "preact";
import FooterLogo from "./FooterLogo.tsx";
import FooterAtt from "./FooterAtt.tsx";
import FooterDescription from "./FooterDescription.tsx";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-black font-light text-sm">
      {isIcon(item)
        ? (
          <div class="border-base-100 border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a class="hover:text-gray-500" href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

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

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  attText1?: HTML;

  attText2?: HTML;

  attText3?: HTML;

  buttonAttText?: HTML;

  buttonNewletterText?: HTML;

  placeHolder?: string;

  bgButton?: string;

  footerDescription1?: HTML;

  footerDescription2?: HTML;

  textPrivacy1?: HTML;

  textPrivacy2?: HTML;
}

function Footer(
  {
    sections = [],
    attText1 = "ENCONTRE UMA LOJA",
    attText2 = "SIGA-NOS NAS REDES SOCIAIS",
    attText3 = "FIQUE POR DENTRO DAS NOVIDADES E PROMOÇOES",
    placeHolder = "Digite seu e-mail...",
    buttonAttText = "ENCONTRE A LOJA MAIS PRÓXIMA",
    buttonNewletterText = "ENVIAR",
    footerDescription1 =
      "CNPJ: 10.718.110/0001-47 | IE: 083.199.90-0 | CEP: 29161-389 | SERRA - ES",
    footerDescription2 =
      "© Todos os direitos reservados. Eventuais promoções, descontos e prazos de pagamento expostos aqui são válidos apenas para compras via internet.",
    textPrivacy1 = "POLÍTICAS DE PRIVACIDADE",
    textPrivacy2 = "SITEMAP",
  }: Props,
) {
  return (
    <footer class="w-full bg-white flex flex-col  border-t-2">
      <div class="w-full container">
        <FooterContainer class="pt-[60px] max-w-[1140px] flex flex-col lg:mx-auto">
          {/* Desktop view */}
          <ul class="hidden lg:flex flex-row w-full">
            {sections.map((section) => (
              <li class="w-[216px]">
                <div>
                  <span class="text-sm font-bold text-black">
                    {section.label}
                  </span>
                  <ul
                    class={`flex ${
                      isIcon(section.children[0]) ? "flex-row" : "flex-col"
                    } gap-2 pt-5 flex-wrap`}
                  >
                    {section.children.map((item) => (
                      <li class="py-[2px]">
                        <SectionItem item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col lg:hidden lg:flex-row gap-4 w-full">
            {sections.map((section) => (
              <li class="border-b border-black w-full">
                <span class="text-black">
                  <details>
                    <summary class="w-full mb-5 text-sm font-medium">
                      {section.label}
                    </summary>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 px-2 pt-2`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </details>
                </span>
              </li>
            ))}
          </ul>
        </FooterContainer>
      </div>

      <div>
        <div class="container w-full mx-auto">
          <FooterContainer class="lg:flex justify-between w-full max-w-[1140px] mx-auto">
            {/* <FooterAtt text1={text1} text2={text2} text3={text3} placeHolder={placeHolder} buttonText={buttonText}  /> */}
            <ul class="lg:flex  gap-10 w-full text-black items-center">
              <li class="block text-center mx-auto  w-full lg:w-[380px]">
                <span class="items-center text-black font-medium text-sm ">
                  <Markdown text={attText1} />
                </span>
                <div>
                  <button class="btn rounded-none w-full lg:w-[352px] tracking-[0.5px] text-white disabled:loading mt-7">
                    <Markdown text={buttonAttText} />
                  </button>
                </div>
              </li>
              <li class="block text-center mx-auto  w-full lg:w-[380px] lg:mt-0 mt-14">
                <span class="items-center text-black font-medium text-sm">
                  <Markdown text={attText2} />
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
                  <Markdown text={attText3} />
                </span>
                <div class="w-full lg:max-w-[380px] mt-[30px] mx-auto ">
                  <Newsletter
                    buttonText={buttonNewletterText}
                    placeHolder={placeHolder}
                  />
                </div>
              </li>
            </ul>
          </FooterContainer>
        </div>
      </div>
      <div class="flex flex-col justify-center text-center mb-16 lg:mb-0">
        <div class="p-[10px] mt-5 mb-6">
          <p class="text-[10px] font-light">
            {footerDescription1}
          </p>
          <p class="text-[10px] font-light">
            {footerDescription2}
          </p>
        </div>
        <div class="flex items-center justify-center pb-1">
          <a href="/">
            <FooterLogo />
          </a>
          <div class="flex justify-between items-baseline text-[10px] font-bold mt-5">
            <a href="/" class="p-1">{textPrivacy1}</a>
            <a href="/" class="p-1">{textPrivacy2}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
