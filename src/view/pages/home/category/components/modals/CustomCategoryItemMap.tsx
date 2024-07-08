import { CategoyResponse } from "../../../../../../app/services/categoriesService/getAll";
import CustomCategoryItem from "../../CustomCategoryItem";

const CustomCategoryItemMap = ({
  categories,
}: {
  categories: CategoyResponse;
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
