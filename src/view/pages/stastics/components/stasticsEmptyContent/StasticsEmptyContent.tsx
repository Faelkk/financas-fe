const StasticsEmptyContent = () => {
  return (
    <section className="mt-10 flex flex-col gap-3 items-center justify-center w-full">
      <div className="bg-[#1C1B19] flex flex-col p-3 max-w-[90%] md:max-w-[50%] md:max-h-[300px] w-full rounded-md">
        <h2 className="font-poppins font-semibold text-gray-50 mb-3">
          Entradas x sáidas
        </h2>
        <span className="font-inter text-black-800 text-[14px] text-center py-10">
          Nenhum relatório encontrado para essa data
        </span>

        <div className="p-3 flex justify-between items-center w-full">
          <div className="flex flex-col items-center">
            <span className="font-inter text-teal-900 font-medium text-[14px]">
              R$ 0,00
            </span>
            <span className="text-[#aaa] font-inter   max-w-[200px] text-center   pp:max-w-max  text-[12px]  pp:text-[16px]">
              entradas
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-inter text-red-400 font-medium text-[14px]">
              R$ 0,00
            </span>
            <span className="text-[#aaa] font-inter  max-w-[200px] text-center   pp:max-w-max  text-[12px]  pp:text-[16px]">
              saidas
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-inter text-[#8CA3CD] font-medium text-[14px]">
              R$ 0,00
            </span>
            <span className="text-[#aaa] font-inter  max-w-[200px] text-center   pp:max-w-max  text-[12px]  pp:text-[16px]">
              Saldo
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#1C1B19] flex flex-col p-3 max-w-[90%] md:max-w-[50%] w-full rounded-md p-8">
        <h2 className="font-poppins font-semibold text-gray-50 mb-3">
          Despesas por categorias
        </h2>
        <span className="text-[#aaa] font-inter   max-w-[200px] text-center   pp:max-w-max  text-[12px]  pp:text-[16px]">
          Nenhum lançamento no periodo
        </span>
      </div>
    </section>
  );
};

export default StasticsEmptyContent;
