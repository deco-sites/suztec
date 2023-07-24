import type { Product } from "deco-sites/std/commerce/types.ts";

interface arrayProps {
  size: string;
  url: string[];
}

export const useVariantPossibilities = (
  { url: productUrl, isVariantOf }: Product,
) => {
  const allProperties = (isVariantOf?.hasVariant ?? [])
    .flatMap(({ additionalProperty = [], url }) =>
      additionalProperty.map((property) => ({ property, url }))
    )
    .filter((x) => x.url)
    .filter((x) => x.property.valueReference === "SPECIFICATION") // Remove this line to allow other than specifications
    .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1);

  const possibilities = allProperties.reduce((acc, { property, url }) => {
    const { name = "", value = "" } = property;

    if (!acc[name]) {
      acc[name] = {};
    }

    if (!acc[name][value]) {
      acc[name][value] = [];
    }

    if (url) {
      // prefer current url first to easy selector implementation
      url === productUrl
        ? acc[name][value].unshift(url)
        : acc[name][value].push(url);
    }

    return acc;
  }, {} as Record<string, Record<string, string[]>>);

  const tamanhoKeys = Object.keys(possibilities.Tamanho);
  tamanhoKeys.sort((a, b) => {
    const tamanhoA = parseFloat(a);
    const tamanhoB = parseFloat(b);
    return tamanhoA - tamanhoB;
  });
  const sortedPossibilities: arrayProps[] = [];
  tamanhoKeys.forEach((size) =>
    sortedPossibilities.push({ size: size, url: possibilities.Tamanho[size] })
  );

  return sortedPossibilities;
};
