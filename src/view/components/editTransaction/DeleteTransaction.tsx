import Modal from "../../modal/Modal";

const DeleteTransaction = ({
  handleToggleDeleteCategoryModal,
  isDeleteModalOpen,
}: {
  handleToggleDeleteCategoryModal: () => void;
  isDeleteModalOpen: boolean;
}) => {
  const handleDeleCategory = () => {
    console.log("deletou");
  };

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
            className="p-3 rounded-md bg-[#E24F45] font-inter text-gray-50 font-semibold max-w-[230px] w-full"
            onClick={handleDeleCategory}
          >
            Confirmar exclusão
          </button>
          <button
            className="p-3 rounded-md border border-black-600 font-inter text-black-600  font-semibold max-w-[230px] w-full"
            onClick={handleToggleDeleteCategoryModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTransaction;
