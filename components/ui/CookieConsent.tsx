import { useId } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

const script = (id: string) => `
const callback = () => {
  const KEY = 'store-cookie-consent';
  const ACCEPTED = 'accepted';
  const HIDDEN = "translate-y-[200%]";
  
  const consent = localStorage.getItem(KEY);
  const elem = document.getElementById("${id}");
  
  if (consent !== ACCEPTED) {
    elem.querySelector('[data-button-cc-accept]').addEventListener('click', function () {
      localStorage.setItem(KEY, ACCEPTED);
      elem.classList.add(HIDDEN);
    });
    elem.querySelector('[data-button-cc-close]').addEventListener('click', function () {
      elem.classList.add(HIDDEN);
    });
    elem.classList.remove(HIDDEN);
  }
};

window.addEventListener('scroll', callback, { once: true });
`;

export interface Props {
  title: HTML;
  text: HTML;
  buttonText: HTML;
  preferenciaCookies: HTML;
  poweredBy: HTML;
}

function CookieConsent(
  { title ="Sua privacidade", text ="Utilizamos cookies para melhorar a experiência do usuário e analisar o tráfego do site. Por esses motivos, podemos compartilhar os dados de uso do seu site com nossos parceiros de análise. Ao clicar em Aceitar cookies, você concorda em armazenar em seu dispositivo todas as tecnologias descritas em nossa Política de cookies. Você pode alterar suas configurações de cookies a qualquer momento clicando em “Preferências de Cookies”. Você pode exercer seus direitos através do Formulário.", buttonText="Aceitar", preferenciaCookies ="Preferências de cookies", poweredBy="POWERED BY DECO.CX" }: Props,
) {
  const id = `cookie-consent-${useId()}`;
  const open = useSignal(false);

  return (
    <>
      <div
        id={id}
        class={open.value
          ? "fixed right-4 bottom-4 w-[320px] h-[323px]"
          : "hidden"}
      >
        <div class="container text-[#1a1a1a] px-5 py-4 rounded h-full border border-base-200 flex flex-col gap-1 items-center shadow bg-base-100">
          <h2 class="text-lg font-semibold tracking-[.5px]">
            <Markdown text={title} />
          </h2>
          <span class="flex-grow text-sm font-extralight tracking-[0.5px] leading-4">
            <Markdown text={text} />
          </span>
          <div class="flex flex-col gap-1 text-center cursor-pointer w-full">
            <button
              data-button-cc-accept
              class="w-full bg-[#007bff] mt-1 rounded text-white items-center text-[15px] font-normal tracking-[0.5px] leading-5 p-[6px]"
              onClick={() => open.value = false}
            >
              <Markdown text={buttonText} />
            </button>
            <a href="https://www.deco.cx">
              <span class="text-base w-full opacity-80 hover:opacity-90">
                <Markdown text={preferenciaCookies} />
              </span>
            </a>
            <span class="text-sm w-full transition-all mt-3 duration-300 opacity-40 hover:opacity-80">
              <Markdown text={poweredBy} />
            </span>
          </div>
        </div>
      </div>
      <div class={open.value ? "hidden" : "fixed bottom-3 right-3 z-40"}>
        <button
          class="bg-[#007bff] text-white p-2 rounded-full shadow-lg"
          aria-label="CookieConsent"
          onClick={() => open.value = true}
        >
          <Icon id="Cookies" class="text-white" size={32} />
        </button>
      </div>
      <script type="module" dangerouslySetInnerHTML={{ __html: script(id) }} />
    </>
  );
}

export default CookieConsent;
