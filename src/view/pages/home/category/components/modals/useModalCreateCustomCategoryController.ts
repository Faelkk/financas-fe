import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { categoriesService } from "../../../../../../app/services/categoriesService";
import { CreateCategory } from "../../../../../../app/services/categoriesService/create";

const schema = z.object({
  categoryName: z.string(),
  categoryColor: z.string(),
  categoryIcon: z.string(),
});

type FormData = z.infer<typeof schema>;

export function svgToBlob(svgString: string): Blob {
  const svg = new Blob([svgString], { type: "image/svg+xml" });
  return svg;
}

export function svgToFile(svgString: string, fileName: string): File {
  const blob = svgToBlob(svgString);
  return new File([blob], fileName, { type: "image/svg+xml" });
}

export function useModalCreateCustomCategoryController(
  selectedCategoryType: "EXPENSE" | "INCOME",
  HandleToggleCustomModal: () => void
) {
  const [selectedColor, setSelectedColor] = useState("#787878");
  const [selectedIcon, setSelectedIcon] = useState("");
  const iconRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const {
    register,
    handleSubmit: HookFormSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoryColor: "#787878",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateCategory) => {
      return categoriesService.create(data);
    },
  });

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      if (iconRef.current) {
        const svgString = iconRef.current.innerHTML;

        const iconFile = svgToFile(svgString, `${data.categoryIcon}.svg`);

        const formData = new FormData();
        formData.append("categoryName", data.categoryName);
        formData.append("categoryColor", data.categoryColor);
        formData.append("image", iconFile);
        formData.append("categoryType", selectedCategoryType);

        const category = await mutateAsync(
          formData as unknown as CreateCategory
        );

        if (category) {
          invalidateCategories();
        }

        toast.success("Categoria criada com sucesso!");
        HandleToggleCustomModal();
      } else {
        throw new Error("Icon reference is not set.");
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao criar categoria");
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

  const isFormEmpty =
    !values.categoryName || !values.categoryColor || !values.categoryIcon;

  return {
    errors,
    handleSubmit,
    register,
    isFormEmpty,
    selectedColor,
    isPending,
    handleChangeColor,
    selectedIcon,
    handleChangeCategoryIcon,
    iconRef,
  };
}
