import { CaretRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { useModal } from "../../../modal/useModal";
import AddTransaction from "../../../components/newTransaction/NewTransaction";

const NewTransaction = () => {
  const {
    isModalOpen: IsTransactionModalOpen,
    handleToggleModal: handleToggleTransactionModal,
  } = useModal();

  return (
    <>
      <section className="px-5 md:p-0">
        <button
          className="bg-[#1C1B19] rounded-md p-5 w-full flex flex-col"
          onClick={handleToggleTransactionModal}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <figure className="rounded-full p-2  bg-[#11110F] hidden pp:block">
                <PlusIcon height="20" width="20" color="#A8AAA7" />
              </figure>
              <div className="flex flex-col">
                <span className="font-inter text-gray-50 text-left">
                  Nova transação
                </span>
                <p className="text-[#aaa] font-inter mt-1 text-[14px] max-w-[180px] text-left">
                  Toque aqui para fazer uma nova transação
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
      {IsTransactionModalOpen && (
        <AddTransaction
          IsTransactionModalOpen={IsTransactionModalOpen}
          handleToggleTransactionModal={handleToggleTransactionModal}
        />
      )}
    </>
  );
};

export default NewTransaction;
