import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";

const formatCurrency = (value: string): string => {
  if (!value) return "0,00";

  let isNegative = false;
  if (value.startsWith("-")) {
    isNegative = true;
    value = value.substring(1);
  }

  value = value.replace(/\D/g, "");
  value = (parseInt(value, 10) / 100).toFixed(2) + "";
  value = value.replace(".", ",");
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  return isNegative ? `-${value}` : value;
};
const parseCurrency = (value: string): number => {
  value = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(value);
};

const schema = z.object({
  number: z.string().refine((val) => !isNaN(parseCurrency(val)), {
    message: "Invalid number format",
  }),
});

type FormData = z.infer<typeof schema>;

const useModalEditBalanceViewController = () => {
  const isPending = false;
  const [isNegative, setIsNegative] = useState(false);
  const [formattedValue, setFormattedValue] = useState("0,00");

  const {
    register,
    handleSubmit: HookFormSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      const parsedValue = parseCurrency(data.number);
      console.log({ number: parsedValue });
    } catch {
      toast.error("Ocorreu um erro ao salvar valor");
    }
  });

  const values = watch();

  const handleToggleNegative = () => {
    setIsNegative(!isNegative);
    const currentValue = parseCurrency(formattedValue);
    const newValue = isNegative
      ? Math.abs(currentValue)
      : -Math.abs(currentValue);

    const formattedNewValue = formatCurrency(
      newValue.toFixed(2).toString().replace(".", ",")
    );

    setFormattedValue(formattedNewValue);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setFormattedValue(formatCurrency(value.number?.toString() || "0,00"));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const isFormEmpty =
    !values.number || parseCurrency(values.number?.toString()) === 0;

  return {
    errors,
    isPending,
    handleSubmit,
    handleToggleNegative,
    formattedValue,
    register,
    isFormEmpty,
    isNegative,
  };
};

export default useModalEditBalanceViewController;
