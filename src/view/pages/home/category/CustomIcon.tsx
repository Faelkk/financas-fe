import { BackpackIcon } from "@radix-ui/react-icons";
import { cn } from "../../../../app/utils/cn";

const CustomIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <figure
      className={cn(
        "rounded-full p-2 flex items-center justify-center max-w-12 max-h-12 h-12 w-12",
        isActive ? "bg-[#484849] border-2 border-black-800" : "bg-gray-500"
      )}
    >
      <BackpackIcon height={20} width={20} color={isActive ? "#FFF" : "#333"} />
    </figure>
  );
};

export default CustomIcon;
