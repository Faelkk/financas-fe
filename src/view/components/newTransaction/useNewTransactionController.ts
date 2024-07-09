import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import { useCategories } from "../../../app/hooks/useCategories";
import { Category } from "../../../app/entities/Category";
import { format } from "date-fns";
import { transactionsService } from "../../../app/services/transactionsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionsParams } from "../../../app/services/transactionsService/create";
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

const useNewTransactionController = (
  HandleToggleTransactionModal: () => void
) => {
  const [formattedValue, setFormattedValue] = useState("0,00");
  const { categories, isLoading } = useCategories();
  const [categoryActive, setCategoryActive] = useState<Category | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [transactionType, setTransactionType] = useState<"EXPENSE" | "INCOME">(
    "EXPENSE"
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
      transactionType,
    },
  });

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryActive(categories[0]);
      setValue("categoryId", categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (categories.length > 0) {
      const filtered = categories.filter(
        (cat) => cat.categoryType === transactionType
      );
      setFilteredCategories(filtered.length > 0 ? filtered : []);
      if (filtered.length > 0) {
        setCategoryActive(filtered[0]);
      } else {
        setCategoryActive(null);
      }
    } else {
      setFilteredCategories([]);
      setCategoryActive(null);
    }
  }, [categories, transactionType]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateTransactionsParams) => {
      return transactionsService.create(data);
    },
  });

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      const parsedValue = parseCurrency(data.transactionValue);
      const formattedDate = format(data.date, "yyyy-MM-dd HH:mm:ss");
      const transactionData = {
        ...data,
        date: formattedDate,
        transactionValue: parsedValue,
      };

      const transaction = await mutateAsync(transactionData);

      if (transaction) {
        invalidateTransactions();
        toast.success("Transação editada com sucesso!");
        HandleToggleTransactionModal();
      }
    } catch {
      toast.error("Ocorreu um erro ao editar transação");
    }
  });

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

  const handleSetTransactionType = (type: "EXPENSE" | "INCOME") => {
    setTransactionType(type);
    setValue("transactionType", type);
  };

  const setCategoryId = (categoryId: string) => {
    setValue("categoryId", categoryId);
  };

  const changeCategoryActive = (category: Category) => {
    setCategoryActive(category);
  };

  useEffect(() => {
    console.log(formattedValue);
  }, [formattedValue]);

  return {
    isLoading,
    categories: filteredCategories,
    errors,
    isPending,
    handleSubmit,
    formattedValue,
    register,
    isFormEmpty,
    setTransactionType: handleSetTransactionType,
    control,
    setCategoryId,
    categoryActive,
    setCategoryActive: changeCategoryActive,
    transactionType,
  };
};

export default useNewTransactionController;
