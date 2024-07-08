import {
  ChevronLeftIcon,
  Cross1Icon,
  MagnifyingGlassIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import Modal from "../../../../../modal/Modal";
import { useModal } from "../../../../../modal/useModal";
import ModalCreateCustomCategory from "./ModalCreateCustomCategory";
import CustomCategoryItemMap from "./CustomCategoryItemMap";
import { useModalCustomCategory } from "./useModalCustomCategory";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import Spinner from "../../../../../components/Spinner";

const ModalCustomCategory = ({
  handleToggleModal,
  isModalOpen,
}: {
  handleToggleModal: () => void;
  isModalOpen: boolean;
}) => {
  const {
    handleToggleModal: HandleToggleCustomModal,
    isModalOpen: isModalCategoryOpen,
  } = useModal();

  const { categories, isLoading } = useCategories();

  const {
    filteredCategories,
    handleToggleSearch,
    isModalActive,
    isSearching,
    setIsModalActive,
    searchQuery,
    setSearchQuery,
  } = useModalCustomCategory({ categories });

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Modal para ver suas categorias"
        classNameModal="h-full medium:max-h-[450px]  md:max-h-[600px] medium:h-auto  rounded-[0px] md:rounded-[6px] p-0 overflow-y-auto custom-scrollbar"
      >
        <header className="flex flex-col bg-[#1E1E1E] p-6 drop-shadow-md">
          {!isSearching ? (
            <div className="flex items-center justify-between gap-3">
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={handleToggleModal}
              >
                {" "}
                <button>
                  {" "}
                  <ChevronLeftIcon color="#FFF" height={20} width={20} />
                </button>
                <h2 className="font-poppins text-gray-50 font-semibold">
                  Categorias
                </h2>
              </div>
              <button onClick={handleToggleSearch}>
                <MagnifyingGlassIcon color="#FFF" height={20} width={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-5">
                {" "}
                <button>
                  <MagnifyingGlassIcon color="#FFF" height={20} width={20} />
                </button>
                <input
                  type="text"
                  className="bg-transparent font-inter text-gray-100 placeholder:text-gray-100 focus:outline-none"
                  placeholder="Pesquisar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button onClick={handleToggleSearch}>
                <Cross1Icon color="#FFF" height={20} width={20} />
              </button>
            </div>
          )}
          <div className="w-full flex justify-center gap-10 mt-8">
            <div className="flex flex-col items-center">
              <button
                className="font-inter text-gray-50 font-medium mb-3"
                onClick={() => setIsModalActive("EXPENSE")}
              >
                Despesas
              </button>
              {isModalActive === "EXPENSE" ? (
                <div className="h-2 w-2 rounded-full bg-gray-0"></div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col items-center ">
              <button
                className="font-inter text-gray-50 font-medium mb-3"
                onClick={() => setIsModalActive("INCOME")}
              >
                Receitas
              </button>
              {isModalActive === "INCOME" ? (
                <div className="h-2 w-2 rounded-full bg-gray-0"></div>
              ) : (
                ""
              )}
            </div>
          </div>
        </header>
        <section className="flex flex-col gap-3 p-5 bg-[#1C1B18] rounded-md ">
          <div
            className="rounded-lg border border-black-400 p-4 flex gap-3 items-center bg-[#11110F]"
            onClick={HandleToggleCustomModal}
          >
            <figure>
              <PlusCircledIcon height={32} width={32} color="#f3f3f3aa" />
            </figure>
            <button className="bg-transparent font-inter placeholder:font-inter text-[#f3f3f3aa] placeholder:text-[#f3f3f3aa]  w-full peer placeholder-shown:pt-0 transition-all outline-none  focus:bg-transparent text-left">
              Criar categoria de{" "}
              {isModalActive === "EXPENSE" ? "Despesa" : "Receita"}
            </button>
          </div>
          <div className="mt-5 flex flex-col gap-10 h-fu">
            {isLoading ? (
              <div className=" flex justify-center w-full h-full">
                {" "}
                <Spinner />
              </div>
            ) : (
              <CustomCategoryItemMap categories={filteredCategories} />
            )}
          </div>
        </section>
      </Modal>

      {isModalCategoryOpen && (
        <ModalCreateCustomCategory
          selectedCategoryType={isModalActive}
          isModalCategoryOpen={isModalCategoryOpen}
          HandleToggleCustomModal={HandleToggleCustomModal}
        />
      )}
    </>
  );
};

export default ModalCustomCategory;
