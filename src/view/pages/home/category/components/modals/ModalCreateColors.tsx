import { cn } from "../../../../../../app/utils/cn";

const ModalCreateColors = ({
  color,
  handleChangeColor,
  selectedColor,
}: {
  color: string;
  handleChangeColor: (color: string) => void;
  selectedColor: string;
}) => {
  return (
    <div
      className={cn("rounded-full p-1 flex items-center cursor-pointer  ")}
      onClick={() => handleChangeColor(color)}
      style={{
        backgroundColor: selectedColor === color ? `${color}80` : color,
      }}
    >
      <div
        style={{ backgroundColor: color }}
        className="h-12 w-12 rounded-full"
      />
    </div>
  );
};

export default ModalCreateColors;
