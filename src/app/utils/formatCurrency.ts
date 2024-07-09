export const formatCurrency = (value: string): string => {
  const number = parseFloat(value);
  if (isNaN(number)) {
    return "Invalid number";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(number);
};
