import Modal from "../../modal/Modal";
import {
  BackpackIcon,
  CheckIcon,
  Cross1Icon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { cn } from "../../../app/utils/cn";

import CategorysTransaction from "./CategorysTransaction";
import DatePickerInput from "../DatePickerInput";
import useNewTransactionController from "./useNewTransactionController";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

const NewTransaction = ({
  IsTransactionModalOpen,
  handleToggleTransactionModal,
  defaultTransaction,
}: {
  IsTransactionModalOpen: boolean;
  handleToggleTransactionModal: () => void;
  defaultTransaction?: "EXPENSE" | "INCOME";
}) => {
  const {
    errors,
    isPending,
    handleSubmit,
    register,
    isFormEmpty,
    formattedValue,
    setTransactionType,
    setCategoryId,
    transactionType,
    control,
    setCategoryActive,
    categories,
    isLoading,
    categoryActive,
  } = useNewTransactionController(handleToggleTransactionModal);

  const handleClickTransactionType = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: "EXPENSE" | "INCOME"
  ) => {
    event.stopPropagation();
    if (transactionType !== type) {
      setTransactionType(type);
    }
  };

  useEffect(() => {
    if (defaultTransaction) {
      defaultTransaction === "EXPENSE"
        ? setTransactionType("EXPENSE")
        : setTransactionType("INCOME");
    }
  }, []);

  return (
    <>
      <Modal
        open={IsTransactionModalOpen}
        title="Modal para fazer nova transação"
        classNameModal=" p-0 flex flex-col h-full w-full medium:h-auto md:w-[90%]  bg-[#151513]"
      >
        <form className="flex flex-col h-full" onSubmit={handleSubmit}>
          <header className="flex flex-col  gap-3 w-full bg-[#2F312E] p-5 relative ">
            <div className="flex justify-center w-full">
              <div className="flex  justify-between medium:max-w-[80%] w-full gap-3 mt-5">
                <div className="flex flex-col items-center">
                  <div
                    className="font-poppins text-gray-50 font-semibold pb-3 cursor-pointer"
                    onClick={(e) => handleClickTransactionType(e, "EXPENSE")}
                  >
                    Despesa
                  </div>
                  {transactionType === "EXPENSE" ? (
                    <div className="h-2 w-2 rounded-full bg-gray-0"></div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <div
                    className="font-poppins text-gray-50 font-semibold pb-3 cursor-pointer"
                    onClick={(e) => handleClickTransactionType(e, "INCOME")}
                  >
                    Receitas
                  </div>

                  {transactionType === "INCOME" ? (
                    <div className="h-2 w-2 rounded-full bg-gray-0"></div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full mt-10">
              <input
                type="text"
                placeholder="0,00"
                id="transactionValue"
                value={formattedValue}
                className="bg-transparent font-inter text-[20px] font-semibold text-gray-100 placeholder:text-gray-100  border border-gray-400 rounded-md p-1 max-w-[80%] w-full focus:outline-none p-2"
                {...register("transactionValue")}
              />
            </div>
          </header>

          <section className="flex-1 h-full flex flex-col bg-[#1A1C19]">
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex flex-col gap-3 p-5">
                <label
                  htmlFor="transactionDescription"
                  className="font-inter text-[#A6A8A5] font-medium "
                >
                  Descrição
                </label>
                <div className="flex gap-3">
                  <Pencil1Icon color="#A6A8A5" width={20} height={20} />
                  <input
                    type="text"
                    id="description"
                    placeholder="Adicione a descrição"
                    autoComplete="off"
                    className="bg-transparent font-inter text-[#A6A8A5] placeholder:text-[#A6A8A5] focus:outline-none border-none"
                    {...register("transactionDescription")}
                  />
                </div>
                {errors.transactionDescription && (
                  <span className="text-red-500">
                    {errors.transactionDescription.message}
                  </span>
                )}
              </div>
              <div className="w-full h-[1px] bg-black-400"></div>
              <CategorysTransaction
                isLoading={isLoading}
                selectedCategoryType={transactionType}
                setCategoryActive={setCategoryActive}
                handleCategorySelect={setCategoryId}
                category={categoryActive}
                categories={categories}
              />
              <div className="w-full h-[1px] bg-black-400"></div>
              <div className="flex flex-col gap-3 p-5">
                <span className="font-inter text-[#A6A8A5] font-medium ">
                  Pago com
                </span>
                <div className="flex gap-3 items-center">
                  <figure className="rounded-full p-2 bg-gray-100">
                    <BackpackIcon height={20} width={20} />
                  </figure>
                  <span className="font-inter  text-gray-100 ">
                    Conta inicial
                  </span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-black-400"></div>

              <Controller
                name="date"
                control={control}
                defaultValue={new Date()}
                render={({ field: { onChange, value } }) => (
                  <DatePickerInput
                    onChange={onChange}
                    error={errors.date?.message}
                    value={value}
                  />
                )}
              />
              <div className="w-full h-[1px] bg-black-400"></div>
            </div>

            <button
              onClick={handleToggleTransactionModal}
              className="absolute top-0  right-0 font-inter text-gray-50 flex gap-3 font-medium "
            >
              <Cross1Icon color="#FFF" height={18} width={18} />
            </button>

            <div className="flex justify-center w-full my-5">
              <button
                disabled={
                  isFormEmpty || Object.keys(errors).length > 0 || isPending
                }
                className={cn(
                  "rounded-full bg-teal-900 p-2 max-w-16 max-h-16 h-16 w-16 flex items-center justify-center disabled:bg-gray-500"
                )}
              >
                <CheckIcon width={32} height={32} />
              </button>
            </div>
          </section>
        </form>
      </Modal>
    </>
  );
};

export default NewTransaction;
