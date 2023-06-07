import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ComponentChildren } from "preact";
import Button from "$store/components/ui/Button.tsx";

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

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return (
    <div class={`py-6 px-4 sm:py-[60px] sm:px-0 ${_class}`}>{children}</div>
  );
}

export interface Props {
  sections?: Section[];
}

function Footer({ sections = [] }: Props) {
  return (
    <footer class="w-full bg-white flex flex-col divide-y divide-primary-content border-t-2">
      <div>
        <div class="container w-full flex flex-col divide-y divide-primary-content">
          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row gap-32 justify-center">
              {sections.map((section) => (
                <li>
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
          <FooterContainer class="flex justify-between w-full">
            <ul class="flex justify-center gap-10 w-full text-black items-center">
              <li class="block text-center w-[380px]">
                <span class="items-center text-black font-semibold text-sm">
                  ENCONTRE UMA LOJA
                </span>
                <div>
                  <button class="btn rounded-none text-white disabled:loading mt-[50px]">
                    ENCONTRE A LOJA MAIS PRÓXIMA
                  </button>
                </div>
              </li>
              <li class="block text-center w-[380px]">
                <span class="items-center text-black font-semibold text-sm">
                  SIGA-NOS NAS REDES SOCIAIS
                </span>
                <ul class="flex items-center justify-center gap-2 mt-[50px]">
                  <li>
                    <a
                      href="https://www.instagram.com/deco.cx"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram logo"
                    >
                      <Icon
                        class="text-primary-content"
                        width={32}
                        height={32}
                        id="Instagram"
                        strokeWidth={1}
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.deco.cx/discord"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Discord logo"
                    >
                      <Icon
                        class="text-primary-content"
                        width={32}
                        height={32}
                        id="Discord"
                        strokeWidth={5}
                      />
                    </a>
                  </li>
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
    </footer>
  );
}

export default Footer;
