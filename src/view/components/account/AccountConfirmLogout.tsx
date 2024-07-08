import { useAuth } from "../../../app/hooks/useAuth";
import Modal from "../../modal/Modal";

const AccountConfirmLogout = ({
  handleConfirmModal,
  isHandleConfirmModal,
}: {
  isHandleConfirmModal: boolean;
  handleConfirmModal: () => void;
}) => {
  const { signout } = useAuth();

  return (
    <>
      <Modal
        open={isHandleConfirmModal}
        title="Modal para confirmar"
        classNameModal="p-0 flex flex-col justify-center items-center h-full md:w-full medium:h-auto md:w-[80%] bg-[#151513]"
      >
        <div className="flex flex-col items-center justify-center gap-5 bg-[#1C1B19] p-10 rounded-md w-[80%] medium:w-full">
          <h2 className="font-inter text-gray-50  text-[18px] font-semibold text-center">
            Você quer mesmo sair da conta? sera necessario fazer login
            novamente.
          </h2>
          <div className="flex flex-col items-center gap-3 w-full">
            <button
              className="p-3 rounded-md bg-[#E24F45] font-inter text-gray-50 font-semibold max-w-[230px] w-full"
              onClick={() => signout()}
            >
              Confirmar exclusão
            </button>
            <button
              className="p-3 rounded-md border border-black-600 font-inter text-black-600  font-semibold max-w-[230px] w-full"
              onClick={handleConfirmModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountConfirmLogout;
