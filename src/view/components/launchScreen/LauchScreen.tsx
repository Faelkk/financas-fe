import Spinner from "../Spinner";
import { Transition } from "@headlessui/react";

interface LaunchScreenProps {
  isLoading: boolean;
}

const LaunchScreen = ({ isLoading }: LaunchScreenProps) => {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-poppins font-medium text-[18px] text-white">
            Minhas finanças
          </h2>
          <Spinner className="text-teal-900 fill-white" />
        </div>
      </div>
    </Transition>
  );
};

export default LaunchScreen;
