import {
  Product,
  ProductGroup,
  PropertyValue,
} from "deco-sites/std/commerce/types.ts";

const cmp = <T extends { property: PropertyValue }>(a: T, b: T) =>
  a.property.value! > b.property.value!
    ? 1
    : a.property.value! < b.property.value!
    ? -1
    : 0;

const groupByProductGroupId = (products: Product[]) => {
  const groups = new Map<string, ProductGroup>();

  for (const p of products) {
    if (p.isVariantOf?.productGroupID) {
      groups.set(p.isVariantOf.productGroupID, p.isVariantOf);
    }
  }

  return [...groups.values()];
};

const groupByPropertyNames = <
  T extends { additionalProperty?: PropertyValue[] },
>(
  items: T[],
) => {
  const properties = new Map<
    string,
    { property: PropertyValue; item: T }[]
  >();

  for (const item of items) {
    const additionalProperty = item.additionalProperty ?? [];
    for (const property of additionalProperty) {
      if (!property.name || !property.value) continue;

      if (!properties.has(property.name)) {
        properties.set(property.name, []);
      }

      properties.get(property.name)?.push({ property, item });
    }
  }

  for (const key of properties.keys()) {
    properties.get(key)!.sort(cmp);
  }

  return properties;
};

export const useVariations = (product: Product, similars: Product[]) => {
  const productGroupVariations = groupByPropertyNames(
    groupByProductGroupId([product, ...similars]),
  );
  const productVariations = groupByPropertyNames(
    product.isVariantOf?.hasVariant ?? [],
  );

  return {
    productGroupVariations,
    productVariations,
  };
};
