import { Category } from "../../../app/entities/Category";

const CategoryItemTransaction = ({
  setCategoryActive,
  handleCategorySelect,
  handleToggleAddCategory,
  category,
}: {
  setCategoryActive: (category: Category) => void;
  handleCategorySelect: (categoryId: string) => void;
  handleToggleAddCategory: () => void;
  category: Category;
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
          className="rounded-full p-2 flex items-center justify-center max-w-12 max-h-12 h-12 w-12 "
          style={{ background: category.categoryColor }}
        >
          <img
            src={`http://localhost:5001/uploads/${category.categoryIcon}`}
            className="w-5 h-5"
          />
        </figure>

        <span className="font-inter text-[14px] text-gray-50  text-center font-semibold">
          {category?.categoryName}
        </span>
      </div>

      <div className="w-full bg-black-300 h-[1px]"></div>
    </>
  );
};

export default CategoryItemTransaction;
