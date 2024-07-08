import { ListBulletIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useModal } from "../../modal/useModal";
import CategoryListTransactions from "./CategoryListTransactions";
import { Category } from "../../../app/entities/Category";
import Spinner from "../Spinner";
import ModalCreateCustomCategory from "../../pages/home/category/components/modals/ModalCreateCustomCategory";

const CategorysTransaction = ({
  isLoading,
  setCategoryActive,
  handleCategorySelect,
  category,
  categories,
  selectedCategoryType,
}: {
  isLoading: boolean;
  setCategoryActive: (category: Category) => void;
  handleCategorySelect: (categoryId: string) => void;
  category: Category | null;
  categories: Category[];
  selectedCategoryType: "EXPENSE" | "INCOME";
}) => {
  const {
    isModalOpen: isModalCategoryOpen,
    handleToggleModal: handleToggleAddCategory,
  } = useModal();

  const {
    handleToggleModal: HandleToggleCustomModal,
    isModalOpen: isModalCreateCategoryOpen,
  } = useModal();

  return (
    <>
      <div className="flex flex-col gap-3 p-5">
        <span className="font-inter text-[#A6A8A5] font-medium ">
          Categorias
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {category && categories.length > 0 ? (
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={handleToggleAddCategory}
              >
                <div
                  className="rounded-full bg-[#B3B3B3] p-2"
                  style={{ background: category?.categoryColor }}
                >
                  <ListBulletIcon color="#FFF" width={20} height={20} />
                </div>
                <span className="font-inter  text-[#A6A8A5]">
                  {category?.categoryName}
                </span>
              </div>
            ) : (
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={HandleToggleCustomModal}
              >
                <div className="rounded-full bg-[#FFF] p-2">
                  <PlusCircledIcon color="#000" />
                </div>
                <span className="font-inter  text-[#A6A8A5]">
                  Criar categoria
                </span>
              </div>
            )}
          </>
        )}
      </div>
      {isModalCategoryOpen && (
        <CategoryListTransactions
          selectedCategoryType={selectedCategoryType}
          categories={categories}
          setCategoryActive={setCategoryActive}
          isModalCategoryOpen={isModalCategoryOpen}
          handleCategorySelect={handleCategorySelect}
          handleToggleAddCategory={handleToggleAddCategory}
        />
      )}

      {isModalCreateCategoryOpen && (
        <ModalCreateCustomCategory
          selectedCategoryType={selectedCategoryType}
          isModalCategoryOpen={isModalCreateCategoryOpen}
          HandleToggleCustomModal={HandleToggleCustomModal}
        />
      )}
    </>
  );
};

export default CategorysTransaction;
