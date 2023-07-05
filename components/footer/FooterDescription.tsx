import FooterLogo from "./FooterLogo.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

export interface Props {
  footerDescription1: HTML;
  /** @title Description 1 */
  footerDescription2: HTML;
  /** @title Description 2 */
  textPrivacy1: HTML;
  /** @title Title 3 */
  textPrivacy2: HTML;
  /** @title Title 3 */
}

const FooterDescription = (
  { footerDescription1, footerDescription2, textPrivacy1, textPrivacy2 }: Props,
) => {
  <div class="flex flex-col justify-center text-center">
    <div class="p-[10px] mt-5 mb-6">
      <p class="text-[10px] font-light">
        <Markdown text={footerDescription1} />
      </p>
      <p class="text-[10px] font-light">
        <Markdown text={footerDescription2} />
      </p>
    </div>
    <div class="flex items-center justify-center pb-1">
      <a href="/">
        <FooterLogo />
      </a>
      <div class="flex justify-between items-baseline text-[10px] font-bold mt-5">
        <a href="/" class="p-1">
          <Markdown text={textPrivacy1} />
        </a>
        <a href="/" class="p-1">
          <Markdown text={textPrivacy2} />
        </a>
      </div>
    </div>
  </div>;
};

export default FooterDescription;
