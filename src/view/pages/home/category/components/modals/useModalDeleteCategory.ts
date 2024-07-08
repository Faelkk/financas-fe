import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../../../../../../app/services/categoriesService";
import { Category } from "../../../../../../app/entities/Category";
import toast from "react-hot-toast";

export function useModalDeleteCategory(
  handleToggleDeleteCategoryModal: () => void,
  handleToggleEditModal: () => void
) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (CategoryId: string) => {
      return categoriesService.remove(CategoryId);
    },
  });

  const queryClient = useQueryClient();

  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const handleDeleCategory = async (categoryBeingDeleted: Category) => {
    try {
      const { data } = await mutateAsync(categoryBeingDeleted.id);

      if (data.deleted) {
        toast.success("Categoria deletada com sucesso!");
        handleToggleDeleteCategoryModal();
        handleToggleEditModal();
        invalidateCategories();
      } else {
        throw new Error("Ocorreu um erro ao deletar categoria");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar categoria");
    }
  };

  return { handleDeleCategory, isPending };
}
