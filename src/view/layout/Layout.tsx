import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const Layout = () => {
  return (
    <div className="bg-[#11110F] flex flex-col h-screen">
      <Header />

      <Outlet />
    </div>
  );
};

export default Layout;
