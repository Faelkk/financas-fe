import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useAuth } from "../../../../app/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { usersService } from "../../../../app/services/userService";
import { SignInParams } from "../../../../app/services/userService/signin";

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

const useSigninController = () => {
  const { signin } = useAuth();
  const {
    register,
    handleSubmit: HookFormSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignInParams) => {
      return usersService.signin(data);
    },
  });

  const handleSubmit = HookFormSubmit(async (data) => {
    try {
      const acessToken = await mutateAsync(data);

      signin(acessToken as unknown as string);
    } catch {
      toast.error("Ocorreu um erro ao fazer login ");
    }
  });

  const values = watch();
  const isFormEmpty = !values.email || !values.password;

  return { errors, isPending, handleSubmit, register, isFormEmpty };
};

export default useSigninController;
