import ProductShelf from "deco-sites/suztec/components/product/ProductShelf.tsx";
import type { Props } from "deco-sites/suztec/components/product/ProductShelf.tsx";

export default function ProductShelfSection(props: Props) {
  return (
    <>
      <div class="w-full max-w-6xl flex justify-center">
        <ProductShelf {...props} />
      </div>
    </>
  );
}
