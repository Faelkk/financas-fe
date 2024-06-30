import { colors } from "../../../../../../mocks/categories";
import ModalCreateColors from "./ModalCreateColors";

const ModalColors = ({
  handleChangeColor,
  selectedColor,
}: {
  handleChangeColor: (color: string) => void;
  selectedColor: string;
}) => {
  return (
    <>
      {colors.map((color, index) => (
        <ModalCreateColors
          selectedColor={selectedColor}
          key={index}
          color={color}
          handleChangeColor={handleChangeColor}
        />
      ))}
    </>
  );
};

export default ModalColors;
