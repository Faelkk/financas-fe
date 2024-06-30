import { CaretRightIcon, ListBulletIcon } from "@radix-ui/react-icons";
import ModalCustomCategory from "./components/modals/ModalCustomCategory";
import { useModal } from "../../../modal/useModal";

const CustomCategory = () => {
  const { isModalOpen, handleToggleModal } = useModal();
  return (
    <>
      <section className="p-5 md:p-0">
        <button
          className="bg-[#1C1B19] rounded-md p-5 w-full flex"
          onClick={handleToggleModal}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <figure className="rounded-full p-2  bg-[#11110F] hidden pp:block">
                <ListBulletIcon height="20" width="20" color="#A8AAA7" />
              </figure>
              <div className="flex flex-col ">
                <span className="font-inter text-gray-50 ">
                  Personalizar categorias
                </span>
                <p className="text-[#aaa] font-inter mt-1 text-[14px] max-w-[180px] text-left">
                  Toque aqui para criar e editar categorias
                </p>
              </div>
            </div>
            <CaretRightIcon
              color="#087F5B"
              width={32}
              height={32}
              className="hidden pp:block"
            />
          </div>
        </button>
      </section>

      {isModalOpen && (
        <ModalCustomCategory
          handleToggleModal={handleToggleModal}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default CustomCategory;
