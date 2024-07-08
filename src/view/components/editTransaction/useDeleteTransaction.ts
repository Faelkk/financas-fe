import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../app/services/transactionsService";
import toast from "react-hot-toast";

export function useDeleteTransaction(
  handleToggleTransactionModal: () => void,
  handleToggleEditModal: () => void
) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (transactionId: string) => {
      return transactionsService.remove(transactionId);
    },
  });

  const queryClient = useQueryClient();

  const invalidateTransaction = () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      const { data } = await mutateAsync(transactionId);

      if (data.deleted) {
        toast.success("transação deletada com sucesso!");
        handleToggleTransactionModal();
        handleToggleEditModal();
        invalidateTransaction();
      } else {
        throw new Error("Ocorreu um erro ao deletar transação");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar transação");
    }
  };

  return { handleDeleteTransaction, isPending };
}
