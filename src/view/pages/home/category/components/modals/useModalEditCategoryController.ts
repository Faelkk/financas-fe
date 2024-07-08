import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Category } from "../../../../../../app/entities/Category";
import { svgToFile } from "./useModalCreateCustomCategoryController";
import { categoriesService } from "../../../../../../app/services/categoriesService";
import { UpdateCategorysParams } from "../../../../../../app/services/categoriesService/update";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  categoryName: z.string(),
  categoryColor: z.string(),
  categoryIcon: z.string(),
});

type FormData = z.infer<typeof schema>;

export function useModalEditCategoryController(
  categoryBeingEdited: Category,
  HandleToggleEditModal: () => void
) {
  const queryClient = useQueryClient();
  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };
  const [selectedColor, setSelectedColor] = useState(
    categoryBeingEdited.categoryColor
  );
  const [selectedIcon, setSelectedIcon] = useState("");
  const iconRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit: HookFormSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoryName: categoryBeingEdited.categoryName,
      categoryColor: categoryBeingEdited.categoryColor,
      categoryIcon: categoryBeingEdited.categoryIcon,
    },
  });

  const [initialValues, setInitialValues] = useState<FormData>({
    categoryName: categoryBeingEdited.categoryName,
    categoryColor: categoryBeingEdited.categoryColor,
    categoryIcon: categoryBeingEdited.categoryIcon,
  });

  useEffect(() => {
    setInitialValues({
      categoryName: categoryBeingEdited.categoryName,
      categoryColor: categoryBeingEdited.categoryColor,
      categoryIcon: categoryBeingEdited.categoryIcon,
    });
  }, [categoryBeingEdited]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: UpdateCategorysParams) => {
      return categoriesService.update(categoryBeingEdited.id, data);
    },
  });

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      const hasChanged =
        data.categoryName !== initialValues.categoryName ||
        data.categoryColor !== initialValues.categoryColor ||
        data.categoryIcon !== initialValues.categoryIcon;

      if (hasChanged) {
        if (iconRef.current) {
          const svgString = iconRef.current.innerHTML;
          const svgWithWhiteFill = svgString.replace(
            /fill=".*?"/g,
            'fill="#FFF"'
          );
          const iconFile = svgToFile(
            svgWithWhiteFill,
            `${data.categoryIcon}.svg`
          );

          const formData = new FormData();
          formData.append("categoryName", data.categoryName);
          formData.append("categoryColor", data.categoryColor);
          formData.append("image", iconFile);
          formData.append("categoryType", categoryBeingEdited.categoryType);

          const category = await mutateAsync(
            formData as unknown as UpdateCategorysParams
          );

          if (category) {
            invalidateCategories();
          }

          toast.success("Categoria criada com sucesso!");
        }
      } else {
        HandleToggleEditModal();
      }
    } catch {
      toast.error("Ocorreu um erro ao salvar valor");
    }
  });

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    setValue("categoryColor", color);
  };

  const handleChangeCategoryIcon = (icon: string) => {
    setSelectedIcon(icon);
    setValue("categoryIcon", icon);
  };

  const values = watch();

  const hasChanged =
    values.categoryName !== initialValues.categoryName ||
    values.categoryColor !== initialValues.categoryColor ||
    values.categoryIcon !== initialValues.categoryIcon;

  const isFormEmpty =
    !values.categoryName || !values.categoryColor || !values.categoryIcon;

  return {
    iconRef,
    errors,
    handleSubmit,
    register,
    isFormEmpty,
    hasChanged,
    selectedColor,
    handleChangeColor,
    selectedIcon,
    isPending,
    handleChangeCategoryIcon,
  };
}
