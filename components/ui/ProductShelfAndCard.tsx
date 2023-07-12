import type { Props as ICard } from "$store/components/ui/Card.tsx";
import Card from "$store/components/ui/Card.tsx";
import { Section } from "$live/blocks/section.ts";
import type { HTML } from "deco-sites/std/components/types.ts";
import Markdown from "deco-sites/suztec/components/ui/Markdown.tsx";

export interface Props {
  card: ICard;
  productShelf: Section;
  title?: HTML;
}

function ProductShelfAndCard(
  { card, productShelf, title = "TRAIL RUN" }: Props,
) {
  const { Component, props } = productShelf;
  return (
    <div>
      <h2 class="text-center">
        <span class="font-medium text-2xl">
          <Markdown text={title} />
        </span>
      </h2>
      <div class="max-w-[1140px] mx-auto justify-center mb-10 md:my-15 flex flex-col md:flex-row items-center">
        <div class="lg:w-3/4">
          <Component {...props} />
        </div>
        <div class="lg:block hidden w-1/4 mb-16">
          <Card {...card} />
        </div>
      </div>
    </div>
  );
}

export default ProductShelfAndCard;
