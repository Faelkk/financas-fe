import { CheckIcon, ChevronLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import Modal from "../../../../../modal/Modal";
import { cn } from "../../../../../../app/utils/cn";
import { useModal } from "../../../../../modal/useModal";
import ModalDeleteCategory from "./ModalDeleteCategory";
import { useModalEditCategoryController } from "./useModalEditCategoryController";
import { Category } from "../../../../../../app/entities/Category";
import ModalColorsEdit from "../../ModalColorsEdit";
import CustomCategoryIcons from "../../CustomCategoryIcons";

const ModalEditCategory = ({
  categoryBeingEdited,
  HandleToggleEditModal,
  isEditModalCategory,
}: {
  categoryBeingEdited: Category;
  HandleToggleEditModal: () => void;
  isEditModalCategory: boolean;
}) => {
  const {
    iconRef,
    errors,
    handleSubmit,
    register,
    isFormEmpty,
    selectedColor,
    selectedIcon,
    isPending,
    handleChangeCategoryIcon,
    handleChangeColor,
    hasChanged,
  } = useModalEditCategoryController(
    categoryBeingEdited,
    HandleToggleEditModal
  );
  const {
    handleToggleModal: handleToggleDeleteCategoryModal,
    isModalOpen: isDeleteModalOpen,
  } = useModal();

  return (
    <>
      <Modal
        open={isEditModalCategory}
        title="Modal para ver o saldo da sua conta"
        classNameModal="p-0 flex flex-col medium:h-auto lg:max-w-[700px]"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <header className="flex flex-col gap-5 bg-[#1E1E1E] p-5">
            <div className="flex justify-between w-full">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={HandleToggleEditModal}
              >
                <button>
                  <ChevronLeftIcon color="#FFF" height={20} width={20} />
                </button>
                <h2 className="font-poppins text-gray-200 font-semibold">
                  Editar categoria
                </h2>
              </div>
              <div
                onClick={handleToggleDeleteCategoryModal}
                className="cursor-pointer"
              >
                <TrashIcon color="#FFF" width={26} height={26} />
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <div
                className=" rounded-full p-1 flex items-center"
                style={{ backgroundColor: `${selectedColor}80` }}
              >
                <button
                  className="bg-gray-400 h-12 w-12 rounded-full"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="category"
                  placeholder="Digite o nome da categoria"
                  className="text-[#aaa] placeholder:text-[#aaa] font-inter mt-1 text-[16px] border-b border-[#aaa] pb-1 bg-transparent focus:outline-none"
                  {...register("categoryName")}
                />
              </div>
            </div>
          </header>
          <section className="flex flex-col bg-[#2F312E] flex-1 p-5">
            <div className="flex flex-col flex-1 gap-10">
              <div className="flex flex-col gap-3">
                <h2 className="font-inter text-gray-300 font-semibold">
                  Escolha uma cor
                </h2>
                <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar pb-3">
                  <ModalColorsEdit
                    handleChangeColor={handleChangeColor}
                    selectedColor={selectedColor}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="font-inter text-gray-300 font-semibold">
                  Escolha um ícone
                </h2>

                <CustomCategoryIcons
                  iconRef={iconRef}
                  handleChangeCategoryIcon={handleChangeCategoryIcon}
                  selectedIcon={selectedIcon}
                />
              </div>
            </div>
            <div className="flex justify-center w-full mt-10">
              <button
                disabled={
                  isFormEmpty ||
                  Object.keys(errors).length > 0 ||
                  !hasChanged ||
                  isPending
                }
                className={cn(
                  "rounded-full bg-teal-900 p-2 max-w-12 max-h-12 h-12 w-12 flex items-center justify-center disabled:bg-gray-500"
                )}
              >
                <CheckIcon width={32} height={32} />
              </button>
            </div>
          </section>
        </form>
      </Modal>

      {isDeleteModalOpen && (
        <ModalDeleteCategory
          categoryBeingDeleted={categoryBeingEdited}
          isDeleteModalOpen={isDeleteModalOpen}
          handleToggleEditModal={HandleToggleEditModal}
          handleToggleDeleteCategoryModal={handleToggleDeleteCategoryModal}
        />
      )}
    </>
  );
};

export default ModalEditCategory;
