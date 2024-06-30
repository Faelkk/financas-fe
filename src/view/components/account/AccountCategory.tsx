import { ListBulletIcon } from "@radix-ui/react-icons";

import { useModal } from "../../modal/useModal";
import ModalCustomCategory from "../../pages/home/category/components/modals/ModalCustomCategory";

const AccountCategory = () => {
  const { isModalOpen, handleToggleModal } = useModal();

  return (
    <>
      <div
        className=" flex gap-3 items-center px-5 py-1"
        onClick={handleToggleModal}
      >
        <ListBulletIcon height="20" width="20" color="#FFF" />

        <h2 className="font-inter text-gray-50 ">Categorias</h2>
      </div>
      {isModalOpen && (
        <ModalCustomCategory
          handleToggleModal={handleToggleModal}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default AccountCategory;
