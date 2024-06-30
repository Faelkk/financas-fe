import {
  AvatarIcon,
  BarChartIcon,
  HomeIcon,
  MixerHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../app/utils/cn";
import { useModal } from "../modal/useModal";
import AccountConfig from "./account/AccountConfig";
import NewTransaction from "./newTransaction/NewTransaction";

export const Header = () => {
  const location = useLocation();
  const { isModalOpen, handleToggleModal } = useModal();
  const {
    isModalOpen: IsTransactionModalOpen,
    handleToggleModal: handleToggleTransactionModal,
  } = useModal();

  return (
    <>
      <header className="bg-[#1C1B19] fixed bottom-0  p-5 drop-shadow-md border-t border-black-300 md:hidden flex justify-center w-full">
        <nav className="flex gap-4 pp:gap-10 items-center ">
          <Link to="/">
            <HomeIcon
              height={24}
              width={24}
              color={location.pathname === "/" ? "#099268" : "#F8F9FA"}
            />
          </Link>
          <Link to="/transactions">
            <MixerHorizontalIcon
              height={24}
              width={24}
              color={
                location.pathname === "/transactions" ? "#099268" : "#F8F9FA"
              }
            />
          </Link>

          <button
            className="bg-teal-800 rounded-full p-3"
            onClick={handleToggleTransactionModal}
          >
            <PlusIcon height={24} width={24} color="#F8F9FA" />
          </button>
          <Link to="/statistics">
            <BarChartIcon
              height={24}
              width={24}
              color={
                location.pathname === "/statistics" ? "#099268" : "#F8F9FA"
              }
            />
          </Link>

          <button onClick={handleToggleModal}>
            <AvatarIcon height={24} width={24} color="#F8F9FA" />
          </button>
        </nav>
      </header>

      <header className="hidden md:block bg-[#1C1B19] p-6">
        <div className="flex justify-center lg:justify-between items-center">
          <h2 className="font-poppins text-gray-50  text-[18px] hidden lg:block">
            Organize suas finanças
          </h2>
          <nav className="flex gap-10 ">
            <div className="flex flex-col">
              <Link to="/" className="flex gap-2">
                <HomeIcon height={24} width={24} color="#F8F9FA" />
                <span className={cn("font-inter text-gray-50")}>Inicio</span>
              </Link>
              <div
                className={cn(
                  "",
                  location.pathname === "/" ? "border-b-2 pb-2" : "#F8F9FA"
                )}
              ></div>
            </div>
            <div className="flex flex-col">
              <Link to="/transactions" className="flex gap-2">
                <MixerHorizontalIcon height={24} width={24} color="#F8F9FA" />
                <span className={cn("font-inter text-gray-50")}>
                  Transações
                </span>
              </Link>
              <div
                className={cn(
                  "",
                  location.pathname === "/transactions"
                    ? "border-b-2 pb-2"
                    : "#F8F9FA"
                )}
              ></div>
            </div>

            <div className="flex flex-col">
              <Link to="/statistics" className="flex gap-2">
                <BarChartIcon height={24} width={24} color="#F8F9FA" />
                <span className={cn("font-inter text-gray-50")}>
                  Estatiscas
                </span>
              </Link>
              <div
                className={cn(
                  "",
                  location.pathname === "/statiscs"
                    ? "border-b-2 pb-2"
                    : "#F8F9FA"
                )}
              ></div>
            </div>

            <div className="flex flex-col">
              <button className="flex gap-2" onClick={handleToggleModal}>
                <AvatarIcon height={24} width={24} color="#F8F9FA" />

                <span className={cn("font-inter text-gray-50")}>Conta</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {isModalOpen && (
        <AccountConfig
          handleToggleModal={handleToggleModal}
          isModalOpen={isModalOpen}
        />
      )}

      {IsTransactionModalOpen && (
        <NewTransaction
          IsTransactionModalOpen={IsTransactionModalOpen}
          handleToggleTransactionModal={handleToggleTransactionModal}
        />
      )}
    </>
  );
};
