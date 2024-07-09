import { CheckIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import Modal from "../../../../../modal/Modal";
import CustomCategoryIcons from "../../CustomCategoryIcons";
import { cn } from "../../../../../../app/utils/cn";
import ModalColors from "./ModalColors";
import { useModalCreateCustomCategoryController } from "./useModalCreateCustomCategoryController";

const ModalCreateCustomCategory = ({
  selectedCategoryType,
  HandleToggleCustomModal,
  isModalCategoryOpen,
}: {
  selectedCategoryType: "EXPENSE" | "INCOME";
  HandleToggleCustomModal: () => void;
  isModalCategoryOpen: boolean;
}) => {
  const {
    isPending,
    iconRef,
    errors,
    handleSubmit,
    register,
    isFormEmpty,
    selectedColor,
    selectedIcon,
    handleChangeCategoryIcon,
    handleChangeColor,
  } = useModalCreateCustomCategoryController(
    selectedCategoryType,
    HandleToggleCustomModal
  );

  return (
    <>
      <Modal
        open={isModalCategoryOpen}
        title="Modal para criar categoria"
        classNameModal="p-0 flex flex-col medium:h-auto lg:max-w-[700px]"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <header className="flex flex-col gap-5 bg-[#1E1E1E] p-5 cursor-pointer">
            <div className="flex items-center gap-3 r">
              <ChevronLeftIcon
                color="#FFF"
                height={20}
                width={20}
                onClick={HandleToggleCustomModal}
              />

              <h2 className="font-poppins text-gray-200 font-semibold">
                Criar categoria
              </h2>
            </div>

            <div className="flex gap-5 items-center">
              <div
                className="rounded-full p-1 flex items-center"
                style={{
                  backgroundColor: selectedColor,
                }}
              >
                <div
                  className=" h-12 w-12 rounded-full"
                  style={{
                    backgroundColor: selectedColor,
                  }}
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
                  <ModalColors
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
                  selectedIcon={selectedIcon}
                  handleChangeCategoryIcon={handleChangeCategoryIcon}
                />
              </div>
            </div>
            <div className="flex justify-center w-full mt-10">
              <button
                disabled={
                  isFormEmpty || Object.keys(errors).length > 0 || isPending
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
    </>
  );
};

export default ModalCreateCustomCategory;
