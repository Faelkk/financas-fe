export const formatCurrency = (value: string): string => {
  if (!value) return "0,00";

  const numericValue = value.replace(/\D/g, "");

  const integerValue = parseInt(numericValue, 10);

  const formattedValue = integerValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formattedValue;
};
