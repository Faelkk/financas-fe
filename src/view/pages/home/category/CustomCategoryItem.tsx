import { BackpackIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { CategoryType } from "../../../../mocks/categories";
import { useModal } from "../../../modal/useModal";
import ModalEditCategory from "./components/modals/ModalEditCategory";

const CustomCategoryItem = ({ category }: { category: CategoryType }) => {
  const { handleToggleModal, isModalOpen: isEditModalCategory } = useModal();

  return (
    <>
      <div className="flex justify-between border-b border-black-400 pb-3">
        <div className="flex gap-3  ">
          <figure
            className="rounded-full p-2 bg-gray-100"
            style={{ background: category.categoryColor }}
          >
            <BackpackIcon height={20} width={20} color="#FFF" />
          </figure>
          <span className="text-[#aaa] font-inter mt-1 text-[16px] max-w-[180px] ">
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
