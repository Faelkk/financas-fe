import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, ChangeEvent } from "react";

type HeaderFilterTransactionsProps = {
  onSearch: (searchTerm: string) => void;
};

const HeaderFilterTransactions: React.FC<HeaderFilterTransactionsProps> = ({
  onSearch,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleSearching = () => {
    setIsSearching(!isSearching);
    setSearchTerm("");
    onSearch("");
  };

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <header className="flex justify-center w-full p-4 bg-[#151513] h-[59px]">
      <div className="flex justify-between md:max-w-[50%] gap-5 w-full ">
        {!isSearching ? (
          <>
            <h2 className="hidden pp:block w-[20px]"></h2>
            <h2 className="font-inter font-medium text-gray-50 pp:text-[18px]">
              Fluxo de caixa
            </h2>
            <button onClick={handleToggleSearching}>
              <MagnifyingGlassIcon color="#F8F9FA" width={20} height={20} />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-5">
              <button>
                <MagnifyingGlassIcon color="#FFF" height={20} width={20} />
              </button>
              <input
                type="text"
                value={searchTerm}
                onChange={handleChangeSearchTerm}
                className="bg-transparent font-inter text-gray-100 placeholder:text-gray-100 focus:outline-none flex-1 w-full"
                placeholder="Pesquisar"
              />
            </div>
            <button onClick={handleToggleSearching}>
              <Cross1Icon color="#FFF" height={20} width={20} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderFilterTransactions;
