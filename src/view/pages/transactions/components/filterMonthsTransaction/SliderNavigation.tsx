import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";
import { useEffect } from "react";

interface FiltersMonthsTransactionsProps {
  onMonthChange: (monthIndex: number) => void;
  isLoading: boolean;
}

const SliderNavigation = ({
  onMonthChange,
  isLoading,
}: FiltersMonthsTransactionsProps) => {
  const swiper = useSwiper();

  useEffect(() => {
    const handleSlideChange = () => {
      if (!isLoading) {
        const currentSlideIndex = swiper.realIndex;

        if (currentSlideIndex === 0) {
          swiper.slideTo(1);
        } else {
          onMonthChange(currentSlideIndex);
        }
      }
    };

    swiper.on("slideChange", handleSlideChange);

    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper, onMonthChange, isLoading]);

  useEffect(() => {
    if (isLoading) {
      swiper.allowSlidePrev = false;
      swiper.allowSlideNext = false;
    } else {
      swiper.allowSlidePrev = true;
      swiper.allowSlideNext = true;
    }
  }, [swiper, isLoading]);

  const handlePrev = () => {
    if (!isLoading) {
      const newIndex = swiper.realIndex - 1;
      if (newIndex === 0) {
        swiper.slideTo(swiper.slides.length - 1);
        onMonthChange(newIndex);
      } else {
        swiper.slidePrev();
        onMonthChange(newIndex);
      }
    }
  };

  const handleNext = () => {
    if (!isLoading) {
      const newIndex = swiper.realIndex + 1;
      if (newIndex >= swiper.slides.length) {
        swiper.slideTo(1);
        onMonthChange(newIndex);
      } else {
        swiper.slideNext();
        onMonthChange(newIndex);
      }
    }
  };

  return (
    <>
      <button
        className="absolute left-0 top-2"
        onClick={handlePrev}
        disabled={isLoading}
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-500 " />
      </button>

      <button
        className="absolute right-0 top-2"
        onClick={handleNext}
        disabled={isLoading}
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-500 " />
      </button>
    </>
  );
};

export default SliderNavigation;
