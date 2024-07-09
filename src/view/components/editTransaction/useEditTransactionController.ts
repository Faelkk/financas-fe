import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCurrency } from "../../../app/utils/formatCurrency";
import { Transaction } from "../../../app/entities/Transactions";
import { Category } from "../../../app/entities/Category";
import { useCategories } from "../../../app/hooks/useCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { transactionsService } from "../../../app/services/transactionsService";
import { UpdateTransactionsParams } from "../../../app/services/transactionsService/update";
import { formatEditCurrency } from "../../../app/utils/formatEditCurrency";

const parseCurrency = (value: string): number => {
  value = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(value);
};

const schema = z.object({
  transactionValue: z.string().refine((val) => !isNaN(parseCurrency(val)), {
    message: "Invalid number format",
  }),
  transactionType: z.enum(["EXPENSE", "INCOME"], {
    required_error: "Transaction type is required",
  }),
  transactionDescription: z.string().min(1, "Description is required"),
  date: z.date().refine((val) => !!val, {
    message: "Date is required",
  }),
  categoryId: z.string(),
});

type FormData = z.infer<typeof schema>;

const useEditTransactionController = (
  transaction: Transaction,
  handleToggleTransactionModal: () => void
) => {
  const [formattedValue, setFormattedValue] = useState("0,00");
  const { categories, isLoading } = useCategories();
  const [categoryActive, setCategoryActive] = useState<Category | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [transactionType, setTransactionType] = useState<"EXPENSE" | "INCOME">(
    transaction.transactionType
  );

  const queryClient = useQueryClient();

  const invalidateTransactions = () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  };

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
      transactionType: transaction.transactionType,
      categoryId: transaction.categoryId,
    },
  });

  useEffect(() => {
    setTransactionType(transaction.transactionType as "EXPENSE" | "INCOME");
    setValue("transactionDescription", transaction.transactionDescription);
    const value = formatCurrency(String(transaction.transactionValue));
    setValue("transactionValue", value);
    setValue("date", new Date(transaction.date));
    setCategoryId(transaction.categoryId);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryActive(
        categories.find((cat) => cat.id === transaction.categoryId) ||
          categories[0]
      );
    }
  }, [categories, transaction.categoryId]);

  useEffect(() => {
    if (categories.length > 0) {
      const filtered = categories.filter(
        (cat) => cat.categoryType === transactionType
      );

      setFilteredCategories(filtered.length > 0 ? filtered : []);
      if (filtered.length > 0) {
        setCategoryActive(
          filtered.find((cat) => cat.id === transaction.categoryId) ||
            filtered[0]
        );
      } else {
        setCategoryActive(null);
      }
    } else {
      setFilteredCategories([]);
      setCategoryActive(null);
    }
  }, [categories, transactionType]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      transactionId,
      transactionData,
    }: {
      transactionId: string;
      transactionData: UpdateTransactionsParams;
    }) => {
      return transactionsService.update(transactionId, transactionData);
    },
  });

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      const isEqual = compareValues(data);

      if (!isEqual) {
        const parsedValue = parseCurrency(data.transactionValue);
        const formattedDate = format(data.date, "yyyy-MM-dd HH:mm:ss");
        const transactionData = {
          ...data,
          date: formattedDate,
          transactionValue: parsedValue,
          id: transaction.id,
        };

        const newTransaction = await mutateAsync({
          transactionId: transaction.id,
          transactionData: transactionData,
        });

        if (newTransaction) {
          invalidateTransactions();
          toast.success("Transação editada com sucesso!");
          localStorage.removeItem("saldo");
          handleToggleTransactionModal();
        }
      }
      handleToggleTransactionModal();
    } catch (err) {
      toast.error("Ocorreu um erro ao salvar valor");
    }
  });

  const compareValues = (submittedValues: FormData): boolean => {
    const currentValues = {
      transactionType: transaction.transactionType,
      transactionDescription: transaction.transactionDescription,
      transactionValue: formatCurrency(String(transaction.transactionValue)),
      date: transaction.date,
      categoryId: transaction.categoryId,
    };

    const orderedCurrentValues = {
      transactionType: currentValues.transactionType,
      transactionDescription: currentValues.transactionDescription,
      transactionValue: currentValues.transactionValue,
      date: currentValues.date,
      categoryId: currentValues.categoryId,
    };

    const orderedSubmittedValues = {
      transactionType: submittedValues.transactionType,
      transactionDescription: submittedValues.transactionDescription,
      transactionValue: submittedValues.transactionValue,
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
        formatEditCurrency(value.transactionValue?.toString() || "0,00")
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const isFormEmpty =
    !values.transactionValue ||
    parseCurrency(values.transactionValue?.toString()) === 0 ||
    !values.transactionDescription ||
    !values.transactionType ||
    !values.categoryId ||
    !values.date;

  const HandleTransactionType = (type: "EXPENSE" | "INCOME") => {
    setValue("transactionType", type);
    setTransactionType(type);
  };

  const setCategoryId = (categoryId: string) => {
    setValue("categoryId", categoryId);
  };

  const changeCategoryActive = (category: Category) => {
    setCategoryActive(category);
  };

  return {
    isLoading,
    categories: filteredCategories,
    errors,
    isPending,
    handleSubmit,
    formattedValue,
    register,
    isFormEmpty,
    setTransactionType: HandleTransactionType,
    control,
    setCategoryId,
    setValue,
    categoryActive,
    setCategoryActive: changeCategoryActive,
    transactionType,
  };
};

export default useEditTransactionController;
