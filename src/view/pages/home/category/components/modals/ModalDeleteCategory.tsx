import Modal from "../../../../../modal/Modal";
import { Category } from "../../../../../../app/entities/Category";
import { useModalDeleteCategory } from "./useModalDeleteCategory";
import { cn } from "../../../../../../app/utils/cn";
import Spinner from "../../../../../components/Spinner";

const ModalDeleteCategory = ({
  handleToggleDeleteCategoryModal,
  handleToggleEditModal,
  categoryBeingDeleted,
  isDeleteModalOpen,
}: {
  handleToggleDeleteCategoryModal: () => void;
  handleToggleEditModal: () => void;
  isDeleteModalOpen: boolean;
  categoryBeingDeleted: Category;
}) => {
  const { handleDeleCategory, isPending } = useModalDeleteCategory(
    handleToggleDeleteCategoryModal,
    handleToggleEditModal
  );

  return (
    <Modal
      open={isDeleteModalOpen}
      title="Modal para deletar categoria"
      classNameModal="p-0 flex flex-col h-auto w-[80%]"
    >
      <div className="flex flex-col items-center justify-center gap-5 bg-[#1C1B19] p-10 rounded-md">
        <h2 className="font-inter text-gray-50  text-[18px] font-semibold text-center">
          Você quer mesmo excluir a categoria{" "}
          <span>{categoryBeingDeleted.categoryName}</span>
        </h2>
        <div className="flex flex-col items-center gap-3 w-full">
          <button
            className={cn(
              "p-3 rounded-md bg-[#E24F45] font-inter text-gray-50 font-semibold max-w-[230px] w-full disabled:bg-[#484849]"
            )}
            onClick={() => handleDeleCategory(categoryBeingDeleted)}
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
            onClick={handleToggleDeleteCategoryModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteCategory;
