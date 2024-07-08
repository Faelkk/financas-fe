import { Pencil2Icon } from "@radix-ui/react-icons";
import { useModal } from "../../../modal/useModal";
import ModalEditCategory from "./components/modals/ModalEditCategory";
import { Category } from "../../../../app/entities/Category";

const CustomCategoryItem = ({ category }: { category: Category }) => {
  const { handleToggleModal, isModalOpen: isEditModalCategory } = useModal();

  return (
    <>
      <div className="flex justify-between border-b border-black-400 pb-3">
        <div className="flex gap-3  ">
          <figure
            className="rounded-full p-2 bg-gray-100"
            style={{ background: category.categoryColor }}
          >
            <img
              src={`http://localhost:5001/uploads/${category.categoryIcon}`}
              className="w-5 h-5"
            />
          </figure>
          <span className="text-[#aaa] font-inter mt-1 text-[16px] max-w-[180px] capitalize">
            {category.categoryName}
          </span>
        </div>
        <button onClick={handleToggleModal}>
          <Pencil2Icon height={20} width={20} color="#087F5B" />
        </button>
      </div>

      {isEditModalCategory && (
        <ModalEditCategory
          categoryBeingEdited={category}
          isEditModalCategory={isEditModalCategory}
          HandleToggleEditModal={handleToggleModal}
        />
      )}
    </>
  );
};

export default CustomCategoryItem;
