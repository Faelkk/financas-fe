import { ComponentProps, forwardRef } from "react";
import { cn } from "../../app/utils/cn";
import { CrossCircledIcon } from "@radix-ui/react-icons";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  name: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, id, placeholder, className, error, label, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <label
          htmlFor={inputId}
          className="font-inter text-gray-50 font-medium"
        >
          {label}
        </label>
        <input
          ref={ref}
          name={name}
          id={id}
          {...props}
          placeholder={placeholder}
          className={cn(
            " bg-black-100 rounded-lg border font-inter placeholder:font-inter border-black-400 px-3 h-[52px] text-black-500 placeholder:text-black-500 w-full  peer placeholder-shown:pt-0  focus:border-teal-800 transition-all outline-none drop-shadow-md mt-1  focus:bg-transparent",
            error && "border-red-900 focus:border-red-900",
            className
          )}
        />

        {error && (
          <div className="flex gap-2 items-center mt-2 text-red-900 ">
            <CrossCircledIcon height={20} width={20} />
            <span className=" font-poppins font-medium">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

export default Input;
