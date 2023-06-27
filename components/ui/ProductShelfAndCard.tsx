import type { Props as ICard } from "$store/components/ui/Card.tsx";
import Card from "$store/components/ui/Card.tsx";

import { Section } from "$live/blocks/section.ts";

export interface Props {
  card: ICard;
  productShelf: Section;
}

function ProductShelfAndCard(
  { card, productShelf }: Props,
) {
  const { Component, props } = productShelf;
  return (
    <div class="sm:home-container justify-center mb-10 md:my-15 flex flex-col md:flex-row items-center">
      <div class="w-[885px] h-[509px]">
        <Component {...props} />
      </div>
      <div class="lg:block hidden w-[272px] h-[385px]">
        <Card {...card} />
      </div>
    </div>
  );
}

export default ProductShelfAndCard;
