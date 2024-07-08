import { formatCurrency } from "../../../../../app/utils/formatCurrency";

interface StaticsCategoryT {
  category: StaticsCategoryProps;
}

interface StaticsCategoryProps {
  categoryName: string;
  percentage: number;
  total: number;
  categoryColor: string;
}

const StaticsCategory = ({ category }: StaticsCategoryT) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          <button
            className="rounded-full p-5 max-w-8 max-h-8 w-full h-8"
            style={{ backgroundColor: category.categoryColor }}
          ></button>
          <h2 className="font-poppins text-gray-50 ">
            {category.categoryName}
          </h2>
        </div>
        <div className="flex flex-col w-[80px]">
          <span className=" font-inter text-gray-0 font-semibold">
            {formatCurrency(String(category.total))}
          </span>
          <span className=" font-inter text-gray-400 text-[14px]">
            {category.percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="w-full h-[1px] border border-black-200 mt-2"></div>
    </>
  );
};

export default StaticsCategory;
