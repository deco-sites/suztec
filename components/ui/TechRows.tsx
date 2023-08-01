import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

export interface Props {
    techs: HTML[]
}

const TechRows = ({techs} : Props) => {
  return (
    <div class="max-w-[1120px] mx-auto py-[30px] px-[10px]">
        <ul class="py-[10px] flex flex-row border-t border-b border-[#d2d2d2] flex-wrap justify-center">
            {techs.map((tech) => <li class="px-[10px] text-lg font-bold text-[#353535] uppercase hover:underline "><Markdown text={tech} /></li>)}
        </ul>
    </div>
  )
}

export default TechRows