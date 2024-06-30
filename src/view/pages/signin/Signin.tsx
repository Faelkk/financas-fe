import SigninForm from "./components/SigninForm";

const Signin = () => {
  return (
    <main className="h-screen w-full bg-black-100">
      <section className="flex justify-center items-center h-full">
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-medium font-poppins text-gray-0">
              Bem vindo!
            </h2>
            <p className="text-[#aaa] font-inter max-w-[300px] text-center mt-2 text-[16px]">
              Acesse sua conta para começar a controlar a sua grana
            </p>
          </div>
          <SigninForm />
        </div>
      </section>
    </main>
  );
};

export default Signin;
