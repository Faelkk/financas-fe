import { useState } from "react";

export function useFiltersMonthsTransactionsController() {
  const [filters, setFilters] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  function handleChangeFilters(filter: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters(filter as any);
  }

  return {
    filters,
    handleChangeFilters,
  };
}
