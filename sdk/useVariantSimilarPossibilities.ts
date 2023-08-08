import type { Product } from "deco-sites/std/commerce/types.ts";

export const useVariantSimilarPossibilities = (products: Product[] | null) => {
  const colors = products?.map((product: Product) => {
    const { isVariantOf } = product;
    const allProperties = (isVariantOf?.hasVariant ?? [])
      .flatMap(({ additionalProperty = [], url }) =>
        additionalProperty.map((property) => ({ property, url }))
      )
      .filter((x) => x.url)
      .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1);

    const possibilities = allProperties.reduce((acc, { property, url }) => {
      const { name = "", value = "" } = property;

      if (name == "Cor") {
        if (!acc[name]) {
          acc[name] = {};
        }

        if (!acc[name][value]) {
          acc[name][value] = [];
        }

        if (url) {
          acc[name][value].push(url);
        }
      }

      return acc;
    }, {} as Record<string, Record<string, string[]>>);
    return possibilities;
  });

  return colors;
};
