import { cn } from "../../../../../app/utils/cn";
import { useSwiper } from "swiper/react";

interface SliderOptionsProps {
  month: string;
  isActive: boolean;
  index: number;
  onMonthClick: (index: number) => void;
  currentYear: number;
  isLoading: boolean;
}

const SliderOption = ({
  isLoading,
  month,
  isActive,
  index,
  currentYear,
  onMonthClick,
}: SliderOptionsProps) => {
  const swiper = useSwiper();

  const handleClick = () => {
    if (!isLoading) {
      swiper.slideTo(index);

      onMonthClick(index);
    }
  };

  const isDefaultYear = currentYear === new Date().getFullYear();

  return (
    <>
      {index !== 0 && (
        <button
          className={cn(
            "w-full rounded-full text-sm tracking-[-0.5px] font-medium text-[#aaa] font-inter text-[14px] p-2",
            isActive ? "bg-[#11110F] border border-gray-700" : "",
            "focus:outline-none"
          )}
          onClick={handleClick}
          disabled={isLoading}
        >
          {month} {!isDefaultYear && currentYear.toString().substr(-2)}
        </button>
      )}
    </>
  );
};

export default SliderOption;
