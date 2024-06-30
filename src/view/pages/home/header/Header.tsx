import { Link } from "react-router-dom";
import UserIcon from "../../../icons/UserIcon";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useModal } from "../../../modal/useModal";
import AccountConfig from "../../../components/account/AccountConfig";
import NewTransaction from "../../../components/newTransaction/NewTransaction";
import { useState } from "react";

const Header = () => {
  const username = "Rafael";
  const { isModalOpen, handleToggleModal } = useModal();
  const {
    isModalOpen: isTransactionModalOpen,
    handleToggleModal: handleToggleTransactionModal,
  } = useModal();
  const [transactionType, setIsTransactionType] = useState("despesa");

  const handleChangeTransactionType = (type: string) => {
    setIsTransactionType(type);
    handleToggleTransactionModal();
  };

  return (
    <>
      <header
        className="flex gap-3 p-5 bg-[#151513] md:hidden cursor-pointer"
        onClick={handleToggleModal}
      >
        <div className="bg-[#151513] rounded-full p-2   flex items-center justify-center max-h-[54px] max-w-[54px] border-[3px] border-[#285E3E] ">
          <div className=" bg-gray-100  rounded-full p-2">
            <UserIcon color="#245A38" width="24" height="24" />
          </div>
        </div>
        <div className="flex flex-col">
          {" "}
          <h2 className="font-inter text-gray-200">Boa noite,</h2>
          <span className="font-poppins text-gray-50 font-semibold text-[20px]">
            {username}
          </span>
        </div>
      </header>

      <header className=" gap-3 py-5 hidden md:flex md:justify-center w-full">
        <div className="flex flex-row lg:min-w-[1000px] md:max-w-[90%] md:w-[90%] gap-10 bg-[#151513] p-3 rounded-md">
          <div className="flex flex-col flex-1">
            <div
              className="flex gap-3 cursor-pointer"
              onClick={handleToggleModal}
            >
              <div className="bg-[#151513] rounded-full p-2   flex items-center justify-center max-h-[54px] max-w-[54px] border-[3px] border-[#285E3E] ">
                <div className=" bg-gray-100  rounded-full p-2">
                  <UserIcon color="#245A38" width="24" height="24" />
                </div>
              </div>
              <div className="flex flex-col">
                {" "}
                <h2 className="font-inter text-gray-200">Boa noite,</h2>
                <span className="font-poppins text-gray-50 font-semibold text-[20px]">
                  {username}
                </span>
              </div>
            </div>
            <div className="flex gap-5 mt-5 ">
              <div className="bg-black-100 flex justify-center items-center flex-col max-w-[200px] w-full rounded-md drop-shadow-md">
                {" "}
                <span className="text-[#aaa] font-inter mt-1 text-[14px] max-w-[180px]">
                  Receita mensal
                </span>
                <span className="font-inter text-teal-900 font-medium">
                  R$900,00
                </span>
              </div>
              <div className="bg-black-100 flex justify-center items-center  flex-col max-w-[200px] w-full rounded-md drop-shadow-md">
                {" "}
                <span className="text-[#aaa] font-inter mt-1 text-[14px] max-w-[180px]">
                  Despesa mensal
                </span>
                <span className="font-inter text-red-500 font-medium">
                  R$400,00
                </span>
              </div>
              <Link
                to="/statistics"
                className="bg-black-100 max-w-[200px] w-full flex justify-center items-center rounded-md drop-shadow-md font-inter text-gray-50"
              >
                Ver relatórios
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="font-poppins text-gray-50 font-medium">
              Acesso rápido
            </h2>
            <div className="flex gap-5 mt-3 ">
              <div
                className="flex gap-2 flex-col items-center justify-center border border-black-200 rounded-md p-2 cursor-pointer"
                onClick={() => handleChangeTransactionType("despesa")}
              >
                <figure>
                  <MinusCircledIcon height={32} width={32} color="#ef4444 " />
                </figure>
                <h3 className="font-inter uppercase text-gray-100">Despesa</h3>
              </div>
              <div
                className="flex gap-2  flex-col items-center justify-center border border-black-200 rounded-md p-2 cursor-pointer"
                onClick={() => handleChangeTransactionType("receita")}
              >
                <figure>
                  <PlusCircledIcon height={32} width={32} color="#087f5b " />
                </figure>
                <h3 className="font-inter uppercase text-gray-100">Receita</h3>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isTransactionModalOpen && (
        <NewTransaction
          defaultTransaction={transactionType as "despesas" | "receitas"}
          IsTransactionModalOpen={isTransactionModalOpen}
          handleToggleTransactionModal={handleToggleTransactionModal}
        />
      )}

      {isModalOpen && (
        <AccountConfig
          handleToggleModal={handleToggleModal}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default Header;
