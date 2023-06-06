import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import Button from "./Button.tsx";
import Markdown from "./Markdown.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface BannerDoubleProps {
  /**
   * @description Configurações do banner principal
   */
  MainBanner: imageProps;
  /**
   * @description Titulo principal do banner em texto
   */
  BannerTitle?: string;

  /**
   * @description Selecione uma fonte para o Title
   */
  TitleFont: "Nunito" | "Lusitana";

  /**
   * @description Descrição curta para o banner
   */
  BannerSubTitle?: HTML;

  /**
   * @description Deseja ativar a descrição curta no banner mobile ?
   */
  BannerSubTitleActive?: boolean;

  /**
   * @description Posição do texto
   */

  TextPosition: "Inicio" | "meio" | "final";

  /**
   * @description Cor do texto em hexadecimal (ex: #ffffff)
   */

  TextColor: string;

  /**
   * @description Tamanho da fonte do título em resoluções desktop (ex: 24px)
   */

  TitleSizeDesktop: string;

  /**
   * @description Tamanho da fonte do título em resoluções mobile (ex: 12px)
   */

  TitleSizeMobile: string;

  /**
   * @description Tamanho da fonte do subtitulo em resoluções desktop (ex: 24px)
   */

  SubTitleSizeDesktop: string;

  /**
   * @description Tamanho da fonte do subtitulo em resoluções mobile (ex: 12px)
   */

  SubTitleSizeMobile: string;

  buttonCallToAction?: CTAProps;
}

export interface imageProps {
  /** @description Upload da imagem da imagem desktop */
  desktop?: LiveImage;
  /** @description Upload da imagem da imagem mobile */
  mobile?: LiveImage;

  /**
   * @description Altura da imagem no desktop
   */
  height?: number;

  /**
   * @description Altura da imagem no mobile
   */
  heightMobile?: number;

  /**
  /**
   * @description SEO Image alt text
   */
  altText?: string;
  /**
   * @description SEO title
   */
  title?: string;
  /**
   * @description Preload de imagem - otimiza a métrica LCP
   */

  preload?: boolean;
}

export interface CTAProps {
  /**
   * @description Defina o nome do botão
   */
  ctaName: string;

  /**
   * @description Defina a url de destino do click no botão
   */
  ctaUrl: string;

  /**
   * @description Selecione uma variação para o botão
   */
  ctaVariant: "icon" | "primary" | "secondary" | "tertiary";
}

function BannerDoble(
  {
    MainBanner,
    BannerTitle,
    TitleFont,
    BannerSubTitle,
    BannerSubTitleActive,
    TextPosition,
    TextColor,
    TitleSizeDesktop,
    TitleSizeMobile,
    SubTitleSizeDesktop,
    SubTitleSizeMobile,
    buttonCallToAction,
  }: BannerDoubleProps,
) {
  return (
    <>
      <div class="w-full h-[518px] flex flex-col justify-center items-center">
        <div
          id="alinhamento-do-texto"
          class={`w-auto h-auto flex flex-col justify-evenly items-end absolute md:(h-auto ${
            TextPosition === "Inicio"
              ? "items-start"
              : TextPosition === "meio"
              ? "items-center"
              : TextPosition === "final"
              ? "items-end"
              : null
          } pr-24 pl-24)`}
        >
          {/* <span class={`w-full h-[45vh] block md:hidden`}></span> */}
          <div
            id="wrapper-text-and-button"
            class={`flex flex-col justify-center items-center gap-6 w-full p-4  ${
              TextPosition === "Inicio"
                ? "items-start"
                : TextPosition === "final"
                ? "items-end"
                : "items-center"
            }) ${
              TextPosition === "Inicio"
                ? "text-left"
                : TextPosition === "final"
                ? "text-right"
                : "text-center"
            }`}
          >
            <div
              id="text-Wrapper"
              class="w-2/3 md:w-full flex flex-col gap-4 justify-center items-center"
            >
              {BannerTitle
                ? (
                  <h2
                    style={{
                      fontFamily: "'avenir next', 'Nunito Sans', sans-serif",
                    }}
                    class={`text-[${TitleSizeMobile}] text-[2rem] text-[${TextColor}] leading-none lg:(text-[${TitleSizeDesktop}]) ${
                      TitleFont == "Lusitana"
                        ? "font-['Lusitana',sans-serif]"
                        : "font-['Nunito&ensp;Sans',sans-serif] font-bold"
                    }`}
                  >
                    {BannerTitle}
                  </h2>
                )
                : null}
              {BannerSubTitle
                ? (
                  <h3
                    class={`text-[${SubTitleSizeMobile}] leading-[28px] text-[${TextColor}] textshadow font-light tracking-[0.45px] ${
                      BannerSubTitleActive ? "block" : "hidden"
                    } md:(block text-[${SubTitleSizeDesktop}])`}
                  >
                    <Markdown text={BannerSubTitle} />
                  </h3>
                )
                : null}
            </div>
            <a href={buttonCallToAction?.ctaUrl}>
              <Button
                class="md:w-52"
                name={buttonCallToAction?.ctaName}
                // variant={buttonCallToAction?.ctaVariant}
              >
                {buttonCallToAction?.ctaName}
              </Button>
            </a>
          </div>
        </div>

        <Picture class="w-full h-full" preload={MainBanner.preload}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={MainBanner.preload ? "high" : "low"}
            src={MainBanner.mobile || "/"}
            width={728}
            height={MainBanner.heightMobile || 1290}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={MainBanner.preload ? "high" : "low"}
            src={MainBanner.desktop || "/"}
            width={728}
            height={MainBanner.height || 700}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={MainBanner.preload ? "eager" : "lazy"}
            src={MainBanner.desktop}
            alt={MainBanner.altText}
            title={MainBanner.title}
          />
        </Picture>
      </div>
    </>
  );
}

export default BannerDoble;
