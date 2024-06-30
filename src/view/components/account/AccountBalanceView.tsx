import { BackpackIcon } from "@radix-ui/react-icons";
import { useModal } from "../../modal/useModal";
import ModalBalanceView from "../../pages/home/balanceView/components/ModalBalanceView";

const AccountBalanceView = () => {
  const { isModalOpen, handleToggleModal } = useModal();
  return (
    <>
      <div
        className=" flex gap-3 items-center px-5 py-1"
        onClick={handleToggleModal}
      >
        <BackpackIcon height="20" width="20" color="#FFF" />

        <h2 className="font-inter text-gray-50 ">Contas</h2>
      </div>

      {isModalOpen && (
        <ModalBalanceView
          handleToggleModal={handleToggleModal}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default AccountBalanceView;
