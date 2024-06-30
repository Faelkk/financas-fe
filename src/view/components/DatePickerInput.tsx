import { CalendarIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";

import DatePicker from "./DatePicker";
import { Popover } from "./Popover";
import { formatDate } from "../../app/utils/formatDate";

interface DatePickerInputProps {
  className?: string;
  error?: string;
  onChange?: (date: Date) => void;
  value?: Date;
}

const DatePickerInput = ({
  className,
  error,
  onChange,
  value,
}: DatePickerInputProps) => {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "w-full rounded-lg   p-5 text-left flex flex-col gap-2",
              error && "!border-red-900",
              className
            )}
          >
            <span className="left-[13px] top-2 pointer-events-none font-inter text-[#A6A8A5] font-medium ">
              Data
            </span>
            <div className="flex gap-3">
              <CalendarIcon height={20} width={20} color="#A6A8A5" />
              <span className="font-inter  text-gray-100 ">
                {formatDate(selectedDate)}
              </span>
            </div>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
};

export default DatePickerInput;
