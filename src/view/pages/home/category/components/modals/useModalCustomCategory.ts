import { useState, useEffect } from "react";
import { Category } from "../../../../../../app/entities/Category";

export const useModalCustomCategory = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [isModalActive, setIsModalActive] = useState<"EXPENSE" | "INCOME">(
    "EXPENSE"
  );
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const filtered = categories.filter(
      (category) =>
        category.categoryType === isModalActive &&
        category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, isModalActive, searchQuery]);

  const handleToggleSearch = () => {
    setIsSearching(!isSearching);
  };

  return {
    filteredCategories,
    handleToggleSearch,
    isModalActive,
    isSearching,
    setIsModalActive,
    searchQuery,
    setSearchQuery,
  };
};
