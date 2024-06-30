import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../../../app/utils/formatCurrency";
import { Transaction } from "../../pages/transactions/components/transactionCard/TransactionCard";
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

const useEditTransactionController = (
  transaction: Transaction,
  handleToggleTransactionModal: () => void
) => {
  const isPending = false;
  const [formattedValue, setFormattedValue] = useState("0,00");
  const [categoryActive, setCategoryActive] = useState(categories[0]);
  const [transactionTypeText, setTransactionTypeText] = useState(
    transaction.transactionType
  );

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

  useEffect(() => {
    setTransactionType(transaction.transactionType as "receitas" | "despesas");
    setValue("description", transaction.description);
    const value = formatCurrency(String(transaction.transferNumber));
    setValue("transferNumber", value);
    setValue("date", new Date(transaction.date));
    setCategoryId(transaction.categoryId);
  }, []);

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      const isEqual = compareValues(data);

      if (!isEqual) {
        const parsedValue = parseCurrency(data.transferNumber);
        console.log(parsedValue);
      }
      handleToggleTransactionModal();
    } catch (err) {
      toast.error("Ocorreu um erro ao salvar valor");
    }
  });

  const compareValues = (submittedValues: FormData): boolean => {
    const currentValues = {
      transactionType: transaction.transactionType,
      description: transaction.description,
      transferNumber: formatCurrency(String(transaction.transferNumber)),
      date: transaction.date,
      categoryId: transaction.categoryId,
    };

    const orderedCurrentValues = {
      transactionType: currentValues.transactionType,
      description: currentValues.description,
      transferNumber: currentValues.transferNumber,
      date: currentValues.date,
      categoryId: currentValues.categoryId,
    };

    const orderedSubmittedValues = {
      transactionType: submittedValues.transactionType,
      description: submittedValues.description,
      transferNumber: submittedValues.transferNumber,
      date: submittedValues.date,
      categoryId: submittedValues.categoryId,
    };

    const isEqual =
      JSON.stringify(orderedCurrentValues) ===
      JSON.stringify(orderedSubmittedValues);

    return isEqual;
  };
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
    setTransactionTypeText(type);
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
    setValue,
    categoryActive,
    setCategoryActive: changeCategoryActive,
    transactionType: transactionTypeText,
  };
};

export default useEditTransactionController;
