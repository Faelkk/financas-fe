import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .nonempty("E-mail é obrigatorio")
    .email("Informe um Email valido"),
  password: z
    .string()
    .nonempty("Senha é obrigatoria")
    .min(8, "A senha deve conter pelo menos 8 digitos"),
});

type FormData = z.infer<typeof schema>;

// const { mutateAsync, isPending } = useMutation({
//     mutationFn: async (data: SignInParams) => {
//         return authService.signin(data);
//     },
// });

const useSigninController = () => {
  const isPending = false;

  const {
    register,
    handleSubmit: HookFormSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      console.log(data);
    } catch {
      toast.error("Ocorreu um erro ao criar a conta");
    }
  });

  const values = watch();
  const isFormEmpty = !values.email || !values.password;

  return { errors, isPending, handleSubmit, register, isFormEmpty };
};

export default useSigninController;
