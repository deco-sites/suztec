import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "deco-sites/std/commerce/types.ts";
import { formatPrice } from "deco-sites/suztec/sdk/format.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
) => {
  const { billingDuration, billingIncrement } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  return `${billingDuration}x de R$ ${billingIncrement} sem juros`;
};

const installmentToShelvesToString = (
  installment: UnitPriceSpecification,
) => {
  const { billingDuration, billingIncrement } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  return `${billingDuration}x de ${formatPrice(billingIncrement, "BRL")}`;
};

const bestOffer = (aggregateOffer?: AggregateOffer) =>
  aggregateOffer?.offers[0];

export const inStock = (offer?: AggregateOffer) =>
  bestOffer(offer)?.availability === "https://schema.org/InStock";

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const inStock = offer?.availability === "https://schema.org/InStock";

  return {
    price,
    listPrice: listPrice?.price,
    seller,
    inStock: inStock,
    installments: installment && price
      ? installmentToString(installment)
      : null,
    installmentToShelves: installment && price
      ? installmentToShelvesToString(installment)
      : null,
  };
};
