import {
  BackpackIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../../../app/utils/cn";
import ModalBalanceView from "./components/ModalBalanceView";
import { useModal } from "../../../modal/useModal";

const BalanceView = () => {
  const [isClosed, setIsClosed] = useState(false);
  const { isModalOpen, handleToggleModal } = useModal();

  return (
    <>
      <section className="px-5 pt-5 md:p-0 md:w-1/2 md:h-full">
        <div className="bg-[#1C1B19] rounded-md p-5 h-full md:flex md:flex-col md:justify-between">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-[#aaa] font-inter mt-2 text-[16px]">
                Saldo geral
              </span>
              <span
                className={cn(
                  "font-poppins font-semibold uppercase text-gray-0",
                  isClosed ? "blur-sm" : ""
                )}
              >
                R$ 0,00
              </span>
            </div>
            <button onClick={() => setIsClosed(!isClosed)}>
              {isClosed ? (
                <EyeClosedIcon width={24} height={24} color="#F8F9FA" />
              ) : (
                <EyeOpenIcon width={24} height={24} color="#F8F9FA" />
              )}
            </button>
          </div>
          <div>
            <div className="w-full bg-gray-700 h-[1px] mt-3 rounded-md"></div>
            <div className="flex flex-col mt-3 md:mt-5 ">
              <h2 className="font-poppins text-gray-50">Sua conta</h2>
              <div className="flex flex-col md:h-[130px] justify-between md:bg-black-200 md:rounded-md md:p-3 md:mt-2 relative">
                <div className="flex flex-col pp:flex-row justify-between gap-3 pp:items-center">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                      <figure className="rounded-full p-2 bg-gray-100">
                        <BackpackIcon height={20} width={20} />
                      </figure>
                      <span className="font-inter text-gray-500">Conta</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-[#8CA3CD] font-medium ",
                      isClosed ? "blur-sm" : ""
                    )}
                  >
                    R$ 0,00
                  </span>
                </div>

                <button
                  className="border border-teal-900 mt-6 md:mt-0 rounded-md text-teal-900 font-semibold p-2 font-poppins"
                  onClick={handleToggleModal}
                >
                  Gerenciar conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <ModalBalanceView
          handleToggleModal={handleToggleModal}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default BalanceView;
