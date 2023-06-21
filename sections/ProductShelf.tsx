import ProductShelf from "deco-sites/suztec/components/product/ProductShelf.tsx";
import type { Props } from "deco-sites/suztec/components/product/ProductShelf.tsx";

export default function ProductShelfSection(props: Props) {
  return (
    <>
      <div class="container">
        <ProductShelf {...props} />
      </div>
    </>
  );
}
