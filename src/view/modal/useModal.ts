import { useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return { isModalOpen, handleToggleModal };
}
