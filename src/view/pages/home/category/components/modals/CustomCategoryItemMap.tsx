import { CategoryType } from "../../../../../../mocks/categories";
import CustomCategoryItem from "../../CustomCategoryItem";

const CustomCategoryItemMap = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  return (
    <>
      {categories.length > 0 ? (
        <>
          {" "}
          {categories.map((category) => (
            <CustomCategoryItem category={category} key={category.id} />
          ))}{" "}
        </>
      ) : (
        <span className="font-inter text-gray-600 font-medium">
          Nenhuma categoria encontrada
        </span>
      )}
    </>
  );
};

export default CustomCategoryItemMap;
