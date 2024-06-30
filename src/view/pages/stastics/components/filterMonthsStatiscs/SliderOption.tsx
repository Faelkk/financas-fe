import { cn } from "../../../../../app/utils/cn";
import { useSwiper } from "swiper/react";

interface SliderOptionsProps {
  month: string;
  isActive: boolean;
  index: number;
  onMonthClick: (index: number) => void;
}

const SliderOption = ({
  month,
  isActive,
  index,
  onMonthClick,
}: SliderOptionsProps) => {
  const swiper = useSwiper();

  const handleClick = () => {
    swiper.slideTo(index);
    onMonthClick(index);
  };

  return (
    <button
      className={cn(
        "w-full rounded-full text-sm tracking-[-0.5px] font-medium text-[#aaa] font-inter text-[14px] p-2",
        isActive ? "bg-[#11110F] border border-gray-700" : "",
        "focus:outline-none"
      )}
      onClick={handleClick}
    >
      {month}
    </button>
  );
};

export default SliderOption;
