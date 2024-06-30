const WineIcon = ({
  color,
  height,
  width,
}: {
  color: string;
  height: number;
  width: number;
}) => {
  return (
    <>
      <svg
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={height}
        height={width}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 13V21M12 13C15.3137 13 18 10.3137 18 7V3H6V7C6 10.3137 8.68629 13 12 13ZM8 21H16" />
      </svg>
    </>
  );
};

export default WineIcon;
