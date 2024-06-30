import { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Modal from "../../modal/Modal";
import CategoryItemTransaction from "./CategoryItemTransaction";
import { CategoryType } from "../../../mocks/categories";

interface CategoryListTransactionsProps {
  setCategoryActive: (category: CategoryType) => void;
  categories: CategoryType[];
  isModalCategoryOpen: boolean;
  handleCategorySelect: (categoryId: number) => void;
  handleToggleAddCategory: () => void;
}

const CategoryListTransactions: React.FC<CategoryListTransactionsProps> = ({
  setCategoryActive,
  categories,
  isModalCategoryOpen,
  handleCategorySelect,
  handleToggleAddCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      open={isModalCategoryOpen}
      title="Selecionar tipo de categoria para transação"
      classNameModal="bg-[#1C1B19] h-full medium:max-h-[800px] overflow-y-auto custom-scrollbar"
    >
      <header>
        <div className="rounded-md bg-[#1E1E1E] p-2 flex justify-between items-center">
          <input
            placeholder="Pesquisar"
            type="text"
            className="font-inter text-gray-600 bg-transparent placeholder:text-gray-600 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon color="#888886" height={20} width={20} />
        </div>
      </header>

      {filteredCategories.length > 0 ? (
        <div className="flex flex-col gap-5 mt-10">
          {filteredCategories.map((category, index) => (
            <CategoryItemTransaction
              key={index}
              setCategoryActive={setCategoryActive}
              category={category}
              handleCategorySelect={handleCategorySelect}
              handleToggleAddCategory={handleToggleAddCategory}
            />
          ))}
        </div>
      ) : (
        <h2 className="font-inter text-gray-50 mt-5">
          Nenhum resultado para essa categoria
        </h2>
      )}
    </Modal>
  );
};

export default CategoryListTransactions;
