import { useEffect, useState } from "react";
import { Category } from "../../../app/entities/Category";

export function useCategoryListTransaction(
  categories: Category[],
  selectedCategoryType: "EXPENSE" | "INCOME"
) {
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.categoryType === selectedCategoryType &&
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, selectedCategoryType, searchTerm]);

  return {
    filteredCategories,
    searchTerm,
    setSearchTerm,
  };
}
