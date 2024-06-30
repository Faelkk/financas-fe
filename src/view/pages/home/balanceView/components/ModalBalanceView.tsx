import {
  BackpackIcon,
  ChevronLeftIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import Modal from "../../../../modal/Modal";
import { useModal } from "../../../../modal/useModal";
import ModalEditBalanceView from "./ModalEditBalanceView";

const ModalBalanceView = ({
  handleToggleModal,
  isModalOpen,
}: {
  handleToggleModal: () => void;
  isModalOpen: boolean;
}) => {
  const {
    isModalOpen: isEditModalOpen,
    handleToggleModal: handleToggleEditModal,
  } = useModal();

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Modal para ver o saldo da sua conta"
        classNameModal="medium:max-h-auto medium:h-auto"
      >
        <header className="flex items-center gap-3">
          <button onClick={handleToggleModal}>
            {" "}
            <ChevronLeftIcon color="#FFF" height={20} width={20} />
          </button>
          <h2 className="font-poppins text-gray-50 font-semibold">Conta</h2>
        </header>
        <section className="flex flex-col gap-3 mt-10 p-5 bg-[#1C1B19] rounded-md">
          <div className="flex items-center gap-3">
            <figure className="rounded-full p-2 bg-gray-100">
              <BackpackIcon height={20} width={20} />
            </figure>
            <h2 className="font-poppins text-gray-50">Sua conta</h2>
          </div>
          <div className="w-full h-[1px] bg-black-200"></div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="text-gray-50 font-poppins">Saldo atual</span>
              <span className="text-[#8CA3CD] font-medium font-inter block">
                R$ 2.555,01
              </span>
            </div>
            <button onClick={handleToggleEditModal}>
              <Pencil2Icon height={20} width={20} color="#087F5B" />
            </button>
          </div>
        </section>
      </Modal>

      {isEditModalOpen && (
        <ModalEditBalanceView
          handleToggleEditModal={handleToggleEditModal}
          isEditModalOpen={isEditModalOpen}
        />
      )}
    </>
  );
};

export default ModalBalanceView;
