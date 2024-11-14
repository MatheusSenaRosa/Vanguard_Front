export const formatToReal = (value: number) =>
  value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
