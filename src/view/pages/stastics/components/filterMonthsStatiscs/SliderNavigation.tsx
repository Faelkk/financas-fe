import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";
import { useEffect } from "react";

interface FiltersMonthsTransactionsProps {
  onMonthChange: (monthIndex: number) => void;
}

const SliderNavigation = ({
  onMonthChange,
}: FiltersMonthsTransactionsProps) => {
  const swiper = useSwiper();

  useEffect(() => {
    const handleSlideChange = () => {
      const currentSlideIndex = swiper.realIndex;
      onMonthChange(currentSlideIndex);
    };

    swiper.on("slideChange", handleSlideChange);

    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper, onMonthChange]);

  const handlePrev = () => {
    const newIndex = swiper.realIndex - 1;
    swiper.slidePrev();
    onMonthChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = swiper.realIndex + 1;
    swiper.slideNext();
    onMonthChange(newIndex);
  };

  return (
    <>
      <button className="absolute left-0 top-2" onClick={handlePrev}>
        <ChevronLeftIcon className="h-6 w-6 text-gray-500 " />
      </button>

      <button className="absolute right-0 top-2" onClick={handleNext}>
        <ChevronRightIcon className="h-6 w-6 text-gray-500 " />
      </button>
    </>
  );
};

export default SliderNavigation;
