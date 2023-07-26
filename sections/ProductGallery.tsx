import ProductGallery from "deco-sites/suztec/components/product/ProductGallery.tsx";
import type { Props as LoaderProps } from "deco-sites/suztec/loaders/plp.ts";
import type { Manifest } from "../live.gen.ts";
import type { FnContext } from "$live/mod.ts";

// deno-lint-ignore ban-types
type Context = FnContext<{}, Manifest>;

export const loader = async (
  loaderProps: LoaderProps,
  _req: Request,
  ctx: Context,
) => {
  const url = new URL(_req.url);
  const page = await ctx.invoke(
    "deco-sites/suztec/loaders/plp.ts",
    loaderProps,
  );

  return { page, loaderProps, url };
};

type PromiseOf<T> = T extends Promise<infer K> ? K : T;

export type Props = PromiseOf<ReturnType<typeof loader>>;

export default function ProductGallerySection(props: Props) {
  const { page, loaderProps, url } = props;

  if (page == null) {
    return (
      <div class="w-full flex justify-center items-center py-10">
        <h1>Not Found!</h1>
      </div>
    );
  }

  return <ProductGallery page={page} loaderProps={loaderProps} url={url} />;
}
