import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ComponentChildren } from "preact";
import FooterLogo from "./FooterLogo.tsx";

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
    <span class="text-black font-medium text-sm">
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
          <a href={item.href}>
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
  return <div class={`py-6 px-4 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
}

function Footer({ sections = [] }: Props) {
  return (
    <footer class="w-full bg-white flex flex-col  border-t-2">
      <div class="flex justify-center">
        <div class=" w-[1140px] flex flex-col">
          <FooterContainer class="pt-[60px] ">
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row">
              {sections.map((section) => (
                <li class="w-[216px]">
                  <div>
                    <span class="text-sm font-bold text-black">
                      {section.label}
                    </span>
                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 pt-2 flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
              {sections.map((section) => (
                <li>
                  <span class="text-primary-content">
                    <details>
                      <summary>
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
      </div>

      <div>
        <div class="container w-full">
          <FooterContainer class="flex justify-between w-full max-w-[1140px] mx-auto">
            <ul class="flex gap-10 w-full text-black items-center">
              <li class="block text-center w-[380px]">
                <span class="items-center text-black font-semibold text-sm">
                  ENCONTRE UMA LOJA
                </span>
                <div>
                  <button class="btn rounded-none w-[352px] text-white disabled:loading mt-[50px]">
                    ENCONTRE A LOJA MAIS PRÓXIMA
                  </button>
                </div>
              </li>
              <li class="block text-center w-[380px]">
                <span class="items-center text-black font-semibold text-sm">
                  SIGA-NOS NAS REDES SOCIAIS
                </span>
                <ul class="flex items-center justify-between gap-2 mt-[50px]">
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
              <li class="block text-center w-[380px]">
                <span class="items-center font-semibold text-black text-sm">
                  FIQUE POR DENTRO DAS NOVIDADES E PROMOÇÕES
                </span>
                <div class="max-w-[380px] mt-[30px] mx-auto ">
                  <Newsletter />
                </div>
              </li>
            </ul>
          </FooterContainer>
        </div>
      </div>
      <div class="flex flex-col justify-center text-center ">
        <div class="h-[93px]">
          <p class="text-[10px] font-medium">
            CNPJ: 10.718.110/0001-47 | IE: 083.199.90-0 | CEP: 29161-389 | SERRA
            - ES
          </p>
          <p class="text-[10px] font-medium">
            © Todos os direitos reservados. Eventuais promoções, descontos e
            prazos de pagamento expostos aqui são válidos apenas para compras
            via internet.
          </p>
        </div>
        <div class="flex items-center justify-center pb-1">
          <a href="/">
            <FooterLogo />
          </a>
          <div class="flex justify-between items-baseline text-[10px] font-bold mt-5">
            <a href="/" class="p-1">POLÍTICAS DE PRIVACIDADE</a>
            <a href="/" class="p-1">SITEMAP</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
