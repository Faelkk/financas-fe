export const formatEditCurrency = (value: string): string => {
  if (!value) return "0,00";
  value = value.replace(/\D/g, "");
  value = (parseInt(value, 10) / 100).toFixed(2) + "";
  value = value.replace(".", ",");
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return value;
};
