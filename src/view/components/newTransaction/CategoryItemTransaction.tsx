import { BackpackIcon } from "@radix-ui/react-icons";
import { CategoryType } from "../../../mocks/categories";

const CategoryItemTransaction = ({
  setCategoryActive,
  handleCategorySelect,
  handleToggleAddCategory,
  category,
}: {
  setCategoryActive: (category: CategoryType) => void;
  handleCategorySelect: (categoryId: number) => void;
  handleToggleAddCategory: () => void;
  category: CategoryType;
}) => {
  const handleClickCategory = () => {
    handleCategorySelect(category.id);
    setCategoryActive(category);
    handleToggleAddCategory();
  };

  return (
    <>
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={handleClickCategory}
      >
        <figure
          style={{ background: category.categoryColor }}
          className={
            "rounded-full p-2 flex items-center justify-center max-w-12 max-h-12 h-12 w-12 "
          }
        >
          <BackpackIcon height={20} width={20} color="#FFF" />
        </figure>
        <span className="font-inter text-[14px] text-gray-50  text-center font-semibold">
          {category.categoryName}
        </span>
      </div>

      <div className="w-full bg-black-300 h-[1px]"></div>
    </>
  );
};

export default CategoryItemTransaction;
