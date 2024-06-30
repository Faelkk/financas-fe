import { ListBulletIcon } from "@radix-ui/react-icons";
import { useModal } from "../../modal/useModal";
import CategoryListTransactions from "./CategoryListTransactions";
import { CategoryType } from "../../../mocks/categories";

const CategorysTransaction = ({
  setCategoryActive,
  handleCategorySelect,
  category,
  categories,
}: {
  setCategoryActive: (category: CategoryType) => void;
  handleCategorySelect: (categoryId: number) => void;
  category: CategoryType;
  categories: CategoryType[];
}) => {
  const {
    isModalOpen: isModalCategoryOpen,
    handleToggleModal: handleToggleAddCategory,
  } = useModal();

  return (
    <>
      <div
        className="flex flex-col gap-3 p-5"
        onClick={handleToggleAddCategory}
      >
        <span className="font-inter text-[#A6A8A5] font-medium ">
          Categorias
        </span>
        <div className="flex gap-3 items-center">
          <div
            className="rounded-full bg-[#B3B3B3] p-2"
            style={{ background: category.categoryColor }}
          >
            <ListBulletIcon color="#FFF" width={20} height={20} />
          </div>
          <span className="font-inter  text-[#A6A8A5]">
            {category.categoryName}
          </span>
        </div>
      </div>
      {isModalCategoryOpen && (
        <CategoryListTransactions
          categories={categories}
          setCategoryActive={setCategoryActive}
          isModalCategoryOpen={isModalCategoryOpen}
          handleCategorySelect={handleCategorySelect}
          handleToggleAddCategory={handleToggleAddCategory}
        />
      )}
    </>
  );
};

export default CategorysTransaction;
