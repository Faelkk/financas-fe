import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useSigninController from "./useSigninController";

const SigninForm = () => {
  const { errors, isPending, handleSubmit, register, isFormEmpty } =
    useSigninController();

  return (
    <form
      action=""
      className="mt-10 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        type="email"
        placeholder="Digite seu email"
        label="Email"
        id="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        type="password"
        placeholder="Digite a senha"
        label="Password"
        id="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        className="mt-2"
        isLoading={isPending}
        disabled={isFormEmpty || Object.keys(errors).length > 0}
      >
        Continuar
      </Button>
    </form>
  );
};

export default SigninForm;
