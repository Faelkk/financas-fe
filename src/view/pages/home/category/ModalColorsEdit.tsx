import { colors as originalColors } from "./components/modals/ModalColors";
import ModalCreateColors from "./components/modals/ModalCreateColors";

const ModalColorsEdit = ({
  handleChangeColor,
  selectedColor,
}: {
  handleChangeColor: (color: string) => void;
  selectedColor: string;
}) => {
  const colors = [
    selectedColor,
    ...originalColors.filter((color) => color !== selectedColor),
  ];

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

export default ModalColorsEdit;
