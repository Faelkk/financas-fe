import BalanceView from "./balanceView/BalanceView";
import CustomCategory from "./category/CustomCategory";
import Header from "./header/Header";
import NewTransaction from "./transaction/NewTransaction";

const Home = () => {
  return (
    <main className="flex-1 flex-col flex h-full">
      <Header />
      <div className=" flex justify-center">
        <div className="flex flex-col md:flex-row max-h-full min-h-[350px] lg:min-w-[1000px]  md:max-w-[90%] w-full gap-3 ">
          <BalanceView />
          <div className="flex flex-col w-full md:w-1/2 gap-3 ">
            <CustomCategory />
            <NewTransaction />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
