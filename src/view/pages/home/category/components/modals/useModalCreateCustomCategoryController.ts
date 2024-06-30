import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  categoryName: z.string(),
  categoryColor: z.string(),
  categoryIcon: z.string(),
});

type FormData = z.infer<typeof schema>;

export function useModalCreateCustomCategoryController() {
  const [selectedColor, setSelectedColor] = useState("#787878");
  const [selectedIcon, setSelectedIcon] = useState("");
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

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      console.log(data);
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

  const isFormEmpty =
    !values.categoryName || !values.categoryColor || !values.categoryIcon;

  return {
    errors,
    handleSubmit,
    register,
    isFormEmpty,
    selectedColor,
    handleChangeColor,
    selectedIcon,
    handleChangeCategoryIcon,
  };
}
