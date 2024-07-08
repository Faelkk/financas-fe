import ModalCreateColors from "./ModalCreateColors";

export const colors = [
  "#787878",
  "#FBA52C",
  "#FFA491",
  "#F88159",
  "#FA6466",
  "#FF494D",
  "#93CD79",
  "#85BB5D",
  "#EC61A2",
  "#FF5591",
  "#E453EC",
  "#83C8F1",
  "#5160B9",
  "#8A76BE",
  "#7253C8",
  "#DAAA6A",
  "#845F29",
  "#27DCA9",
];

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
