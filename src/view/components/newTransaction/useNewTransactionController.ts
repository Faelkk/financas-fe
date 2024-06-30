import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import { formatCurrency } from "../../../app/utils/formatCurrency";
import { CategoryType, categories } from "../../../mocks/categories";

const parseCurrency = (value: string): number => {
  value = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(value);
};

const schema = z.object({
  transferNumber: z.string().refine((val) => !isNaN(parseCurrency(val)), {
    message: "Invalid number format",
  }),
  transactionType: z.enum(["despesas", "receitas"], {
    required_error: "Transaction type is required",
  }),
  description: z.string().min(1, "Description is required"),
  date: z.date().refine((val) => !!val, {
    message: "Date is required",
  }),
  categoryId: z.number(),
});

type FormData = z.infer<typeof schema>;

const useNewTransactionController = () => {
  const isPending = false;
  const [formattedValue, setFormattedValue] = useState("0,00");
  const [categoryActive, setCategoryActive] = useState(categories[0]);

  const {
    register,
    handleSubmit: HookFormSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionType: "despesas",
      categoryId: 1,
    },
  });

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      const parsedValue = parseCurrency(data.transferNumber);
      console.log(data, parsedValue);
    } catch {
      toast.error("Ocorreu um erro ao salvar valor");
    }
  });

  const values = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      setFormattedValue(
        formatCurrency(value.transferNumber?.toString() || "0,00")
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const isFormEmpty =
    !values.transferNumber ||
    parseCurrency(values.transferNumber?.toString()) === 0 ||
    !values.description ||
    !values.transactionType ||
    !values.categoryId ||
    !values.date;

  const setTransactionType = (type: "despesas" | "receitas") => {
    setValue("transactionType", type);
  };

  const setCategoryId = (categoryId: number) => {
    setValue("categoryId", categoryId);
  };

  const changeCategoryActive = (category: CategoryType) => {
    setCategoryActive(category);
  };

  return {
    categories,
    errors,
    isPending,
    handleSubmit,
    formattedValue,
    register,
    isFormEmpty,
    setTransactionType,
    control,
    setCategoryId,
    categoryActive,
    setCategoryActive: changeCategoryActive,
    transactionType: values.transactionType,
  };
};

export default useNewTransactionController;
