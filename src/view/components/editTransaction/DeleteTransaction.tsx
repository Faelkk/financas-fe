import { Transaction } from "../../../app/entities/Transactions";
import Modal from "../../modal/Modal";
import Spinner from "../Spinner";
import { useDeleteTransaction } from "./useDeleteTransaction";

const DeleteTransaction = ({
  transaction,
  handleToggleEditTransactionModal,
  handleToggleTransactionModal,
  isDeleteModalOpen,
}: {
  transaction: Transaction;
  handleToggleTransactionModal: () => void;
  handleToggleEditTransactionModal: () => void;
  isDeleteModalOpen: boolean;
}) => {
  const { handleDeleteTransaction, isPending } = useDeleteTransaction(
    handleToggleTransactionModal,
    handleToggleEditTransactionModal
  );

  return (
    <Modal
      open={isDeleteModalOpen}
      title="Modal para deletar transação"
      classNameModal="p-0 flex flex-col h-auto w-[80%]"
    >
      <div className="flex flex-col items-center justify-center gap-5 bg-[#1C1B19] p-10 rounded-md">
        <h2 className="font-inter text-gray-50  text-[18px] font-semibold text-center">
          Você quer mesmo excluir essa transação? não sera possivel voltar
          atrás.
        </h2>
        <div className="flex flex-col items-center gap-3 w-full">
          <button
            className="p-3 rounded-md bg-[#E24F45] font-inter text-gray-50 font-semibold max-w-[230px] w-full disabled:bg-[#484849]"
            onClick={() => handleDeleteTransaction(transaction.id)}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex justify-center ">
                <Spinner className="fill-gray-500 w-6 h-6" />{" "}
              </div>
            ) : (
              " Confirmar exclusão"
            )}
          </button>
          <button
            className="p-3 rounded-md border border-black-600 font-inter text-black-600  font-semibold max-w-[230px] w-full"
            onClick={handleToggleTransactionModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTransaction;
