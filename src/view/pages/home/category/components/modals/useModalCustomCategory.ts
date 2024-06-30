import { useState } from "react";
import { CategoryType } from "../../../../../../mocks/categories";

export function useModalCustomCategory({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [isModalActive, setIsModalActive] = useState("despesas");
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleSearch = () => {
    setIsSearching(!isSearching);
    setSearchQuery("");
  };

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    isModalActive,
    setIsModalActive,
    handleToggleSearch,
    filteredCategories,
    isSearching,
    searchQuery,
    setSearchQuery,
  };
}
