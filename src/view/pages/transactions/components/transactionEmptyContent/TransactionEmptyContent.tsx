import { PlusIcon } from "@radix-ui/react-icons";

const TransactionEmptyContent = () => {
  return (
    <section className="flex  justify-center items-center flex-1 h-full">
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-poppins text-gray-50 font-semibold max-w-[200px] text-center pp:max-w-max pp:text-[18px]">
          Nenhum lançamento no periodo
        </h2>
        <p className="text-[#aaa] font-inter mt-2  max-w-[200px] text-center   pp:max-w-max  text-[14px]  pp:text-[16px]">
          Toque para adicionar um lançamento
        </p>
        <button className="bg-teal-800  rounded-full p-3 mt-2 ">
          <PlusIcon height={24} width={24} color="#F8F9FA" />
        </button>
      </div>
    </section>
  );
};

export default TransactionEmptyContent;
