import { useEffect, useRef, useState } from "preact/hooks";
import SortMenu from "./SortMenu.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { FilterToggle } from "deco-sites/std/commerce/types.ts";

interface Props {
  filter?: FilterToggle
}

function Sort({ filter }: Props) {
  const sortContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortContainerRef.current &&
        event.target instanceof Node &&
        !sortContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortContainerRef]);

  return (
    <div class="relative z-20 w-full sm:w-auto" ref={sortContainerRef}>
      <button
        class="appearance-none w-full border border-[#d2d2d2] bg-white focus:outline-none outline-none transition duration-150 ease-in-out flex justify-between items-center lg:(min-w-[160px])"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span class="text-base text-[#424242] leading-none font-bold py-[10px] px-[15px] ">
          {filter ? <span>{filter.key}</span> : "DATA DE LANÇAMENTO"}
        </span>
        <div class="items-center ml-8 mr-1">
          <Icon id="ChevronDown" width={20} height={20} strokeWidth={4} />
        </div>
      </button>
      {isOpen && <div>{filter ? <SortMenu values={filter.values} /> : <SortMenu  />}</div>}
    </div>
  );
}

export default Sort;
