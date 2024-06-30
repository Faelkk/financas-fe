const NotFound = () => {
  return (
    <div className="h-screen bg-[#11110F] p-10">
      <h1 className="font-inter text-gray-50 text-2xl">
        404 - Pagina não encontrada
      </h1>
      <p className="font-inter text-gray-50">
        A pagina que você esta procurando não existe.
      </p>
      <button className="font-inter text-blue-500">Voltar</button>
    </div>
  );
};

export default NotFound;
