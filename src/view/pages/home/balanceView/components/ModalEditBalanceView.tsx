import {
  BackpackIcon,
  CheckIcon,
  Cross2Icon,
  MinusCircledIcon,
} from "@radix-ui/react-icons";
import Modal from "../../../../modal/Modal";
import { cn } from "../../../../../app/utils/cn";
import { Dispatch, FC, SetStateAction } from "react";
import useModalEditBalanceViewController from "./useModalEditBalanceViewController";

interface ModalEditBalanceViewProps {
  handleToggleEditModal: () => void;
  isEditModalOpen: boolean;
  setSaldo: Dispatch<SetStateAction<number>>;
  setFormattedSaldo: Dispatch<SetStateAction<string>>;
}

const ModalEditBalanceView: FC<ModalEditBalanceViewProps> = ({
  handleToggleEditModal,
  isEditModalOpen,
  setFormattedSaldo,
  setSaldo,
}) => {
  const {
    errors,
    isPending,
    handleSubmit,
    register,
    isFormEmpty,
    handleToggleNegative,
    formattedValue,
    isNegative,
  } = useModalEditBalanceViewController(
    setFormattedSaldo,
    setSaldo,
    handleToggleEditModal
  );

  return (
    <Modal
      title="Modal para editar saldo da sua conta"
      open={isEditModalOpen}
      classNameModal="max-h-[300px] max-w-[90%] medium:max-w-[60%] md:max-w-[50%] lg:max-w-[30%] 2xl:max-w-[20%] -[#1C1B19] p-3"
    >
      <section className="flex flex-col items-center gap-3 p-3 rounded-lg relative">
        <figure className="rounded-full p-2 bg-gray-100 max-w-12 max-h-12 h-12 w-12 flex items-center justify-center">
          <BackpackIcon height={20} width={20} />
        </figure>
        <div className="flex flex-col items-center">
          <h2 className="font-poppins text-[#f3f3f3aa] font-semibold text-[18px]">
            Sua Conta
          </h2>
          <span className="font-poppins text-[#f3f3f3aa] text-[14px]">
            Defina o novo saldo da sua conta
          </span>
        </div>

        <button
          className="absolute top-0 right-0"
          onClick={handleToggleEditModal}
        >
          <Cross2Icon height={20} width={20} color="#f3f3f3aa" />
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          {" "}
          <div className="rounded-lg border border-black-400 p-3 flex gap-2 items-center">
            <label
              className="font-inter font-semibold text-[#f3f3f3aa]"
              htmlFor="number"
            >
              R$
            </label>
            <input
              className="bg-transparent font-inter placeholder:font-inter text-gray-300 placeholder:text-gray-300 w-full peer placeholder-shown:pt-0 transition-all outline-none font-semibold focus:bg-transparent"
              type="text"
              placeholder="0,00"
              id="number"
              value={formattedValue}
              {...register("number")}
            />
            <button onClick={handleToggleNegative} type="button">
              <MinusCircledIcon
                color={isNegative ? "#e61d1d" : "#f3f3f3aa"}
                height={32}
                width={32}
              />
            </button>
          </div>
          <button
            disabled={
              isFormEmpty || Object.keys(errors).length > 0 || isPending
            }
            className={cn(
              "rounded-full bg-teal-900 p-2 max-w-12 max-h-12 h-12 w-12 flex items-center justify-center disabled:bg-gray-500"
            )}
          >
            <CheckIcon width={32} height={32} />
          </button>
        </form>
      </section>
    </Modal>
  );
};

export default ModalEditBalanceView;
