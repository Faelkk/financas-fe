import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Modal from "../../modal/Modal";
import UserIcon from "../../icons/UserIcon";
import AccountBalanceView from "./AccountBalanceView";
import AccountCategory from "./AccountCategory";

const AccountConfig = ({
  isModalOpen,
  handleToggleModal,
}: {
  isModalOpen: boolean;
  handleToggleModal: () => void;
}) => {
  return (
    <>
      <Modal
        open={isModalOpen}
        title="Modal para deletar categoria"
        classNameModal="p-0 flex flex-col h-full w-full medium:h-auto md:w-[80%] bg-[#151513]"
      >
        <div className="flex flex-col   gap-4   rounded-md flex-1">
          <header className="flex flex-col  gap-3 w-full bg-[#1C1B19] p-3">
            <div className="flex items-center gap-3">
              <button onClick={handleToggleModal}>
                {" "}
                <ChevronLeftIcon color="#FFF" height={20} width={20} />
              </button>
              <h2 className="font-poppins text-gray-50 font-semibold">Conta</h2>
            </div>

            <div className="flex flex-col gap-3 items-center justify-center w-full">
              <div className="bg-[#151513] rounded-full p-2   flex items-center justify-center max-h-[64px] max-w-[64px] border-[3px] border-[#285E3E] ">
                <div className=" bg-gray-100  rounded-full p-2">
                  <UserIcon color="#245A38" width="32" height="32" />
                </div>
              </div>
              <h2 className="font-inter text-black-600 font-semibold">
                Rafael
              </h2>

              <button className="bg-[#232D24] text-[#348351] font-inter font-semibold p-2 rounded-md">
                Editar perfil
              </button>
            </div>
          </header>

          <section className="p-3 flex flex-col items-center justify-between gap-10 h-full">
            <section className=" bg-[#1C1B19] rounded-md flex flex-col gap-5 w-full">
              <h2 className="font-inter text-gray-50 font-semibold px-5 pt-5">
                Configure
              </h2>

              <div className="flex flex-col gap-3 ">
                <AccountBalanceView />
                <div className="w-full h-[1px] bg-black-300"></div>
                <AccountCategory />
                <div className="w-full h-[1px] bg-black-300"></div>
              </div>
            </section>

            <button className="p-3 rounded-md border border-[#E24F45] font-inter text-[#E24F45] justify-center uppercase font-semibold max-w-[230px] w-full mb-10 md:mb-5 flex items-center ">
              Deslogar da conta
            </button>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default AccountConfig;
