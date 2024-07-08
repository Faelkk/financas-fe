import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";

export interface typeTransactionsFilter {
  month: string;
  year: string;
  type: "EXPENSE" | "INCOME" | "";
}

export function useTransactions(filters: typeTransactionsFilter) {
  const { data, isFetching, isPending, refetch, error } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isPending,
    refetch,
    error,
  };
}
