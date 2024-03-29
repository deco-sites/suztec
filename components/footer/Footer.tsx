import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type Item = StringItem | IconItem;

interface itemProps {
  item: Item;
}

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: itemProps) {
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
          <a
            target={item.openInNewTab ? "_blank" : ""}
            class="hover:text-gray-500 "
            href={item.href}
          >
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 ${_class}`}>{children}</div>;
}

export interface socialIcons {
  width: number;
  height: number;
  icon:
    | "Instagram"
    | "Facebook"
    | "Blog"
    | "Youtube"
    | "Linkedin"
    | "Spotify"
    | "GooglePlus";
  href: string;
}

export interface footerSocial {
  socialText1?: HTML;
  socialText2?: HTML;
  socialText3?: HTML;
  icons?: socialIcons[];
  socialButtonText?: HTML;
  newletterTextButton?: HTML;
  newsLetterPlaceHolder?: HTML;
  newsLetterButtonColor?: string;
}

export interface footerPrivacy {
  privacyDescription1?: HTML;
  privacyDescription2?: HTML;
  logoPrivacy1?: HTML;
  logoPrivacy2?: HTML;
}

export interface Props {
  sections?: Section[];

  social?: footerSocial;

  privacy?: footerPrivacy;
}

function Footer(
  {
    sections = [],
    social = {},
    privacy = {},
  }: Props,
) {
  const {
    socialText1 = "ENCONTRE UMA LOJA",
    socialText2 = "SIGA-NOS NAS REDES SOCIAIS",
    socialText3 = "FIQUE POR DENTRO DAS NOVIDADES E PROMOÇOES",
    icons = [
      { href: "#", icon: "Instagram", width: 22, height: 26 },
      { href: "#", icon: "Facebook", width: 22, height: 26 },
      {
        href: "#",
        icon: "Blog",
        width: 25,
        height: 18,
      },
      { href: "#", icon: "Youtube", width: 29, height: 26 },
      { href: "#", icon: "Linkedin", width: 22, height: 26 },
      { href: "#", icon: "Spotify", width: 25, height: 26 },
      {
        href: "#",
        icon: "GooglePlus",
        width: 30,
        height: 30,
      },
    ],
    newsLetterPlaceHolder = "Digite seu e-mail...",
    socialButtonText = "ENCONTRE A LOJA MAIS PRÓXIMA",
    newletterTextButton = "ENVIAR",
  } = social;

  const {
    privacyDescription1 =
      "CNPJ: 10.718.110/0001-47 | IE: 083.199.90-0 | CEP: 29161-389 | SERRA - ES",
    privacyDescription2 =
      "© Todos os direitos reservados. Eventuais promoções, descontos e prazos de pagamento expostos aqui são válidos apenas para compras via internet.",
    logoPrivacy1 = "POLÍTICAS DE PRIVACIDADE",
    logoPrivacy2 = "SITEMAP",
  } = privacy;

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
                          <SectionItem
                            item={item}
                            
                          />
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
            <ul class="lg:flex  gap-10 w-full text-black items-center">
              <li class="block text-center mx-auto  w-full lg:w-[380px]">
                <span class="items-center text-black font-medium text-sm ">
                  <Markdown text={socialText1} />
                </span>
                <div>
                  <button class="btn hover:opacity-80 opacity-100 rounded-none w-full lg:w-[352px] tracking-[0.5px] text-white disabled:loading mt-7">
                    <Markdown text={socialButtonText} />
                  </button>
                </div>
              </li>
              <li class="block text-center mx-auto  w-full lg:w-[380px] lg:mt-0 mt-14">
                <span class="items-center text-black font-medium text-sm">
                  <Markdown text={socialText2} />
                </span>
                <ul class="flex items-center justify-between gap-2 mt-[38px] mb-3">
                  {icons.map((icon) => (
                    <li>
                      <a
                        href={icon.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram logo"
                      >
                        {icon.icon &&
                          (
                            <Icon
                              class="text-black hover:opacity-80 opacity-100 transition-all dutarion-100"
                              width={icon.width}
                              height={icon.height}
                              id={icon.icon}
                              strokeWidth={1}
                            />
                          )}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li class="block text-center mx-auto w-full lg:w-[380px] lg:mt-0 mt-14">
                <span class="items-center font-medium text-black text-sm">
                  <Markdown text={socialText3} />
                </span>
                <div class="w-full lg:max-w-[380px] mt-[30px] mx-auto ">
                  <Newsletter
                    buttonText={newletterTextButton}
                    placeHolder={newsLetterPlaceHolder}
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
            {privacyDescription1}
          </p>
          <p class="text-[10px] font-light">
            {privacyDescription2}
          </p>
        </div>
        <div class="flex items-center justify-center pb-1">
          <a href="/">
            <Icon id="Logo" width={75} height={35} />
          </a>
          <div class="flex justify-between items-baseline text-[10px] font-bold mt-5">
            <a href="/" class="p-1">{logoPrivacy1}</a>
            <a href="/" class="p-1">{logoPrivacy2}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
