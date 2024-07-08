import SliderNavigation from "./SliderNavigation";
import Slider from "./slideProvider";
import { Slide, SliderProps } from "./index";
import SliderOption from "./SliderOption";
import { generateMonths } from "../../../stastics/useStaticsController";

export const settings: SliderProps = {
  slidesPerView: 2,
  slidesPerGroup: 1,
  spaceBetween: 30,
  pagination: {
    clickable: true,
  },
  speed: 500,
  breakpoints: {
    340: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 30,
    },
  },
};

interface FiltersMonthsTransactionsProps {
  onMonthChange: (monthIndex: number) => void;
  currentMonth: number;
  currentYear: number;
  isLoading: boolean;
}

const FiltersMonthsTransactions = ({
  onMonthChange,
  currentMonth,
  currentYear,
  isLoading,
}: FiltersMonthsTransactionsProps) => {
  const months = generateMonths();

  return (
    <section className="bg-[#1C1B19] border-b border-black-400 p-2 w-full md:border-none md:bg-transparent flex md:justify-center ">
      <div className="relative w-full justify-center items-center flex md:max-w-[50%]">
        <Slider settings={settings} month={currentMonth}>
          <SliderNavigation
            onMonthChange={onMonthChange}
            isLoading={isLoading}
          />
          <section
            data-aos="fade-up"
            data-aos-duration="500"
            className="flex items-center max-w-[100%] justify-center bg-[#050505]"
          >
            {months.map((month, index) => (
              <Slide key={index}>
                {({ isActive }) => (
                  <SliderOption
                    currentYear={currentYear}
                    index={index}
                    month={month}
                    isActive={isActive}
                    onMonthClick={onMonthChange}
                    isLoading={isLoading}
                  />
                )}
              </Slide>
            ))}
          </section>
        </Slider>
      </div>
    </section>
  );
};

export default FiltersMonthsTransactions;
