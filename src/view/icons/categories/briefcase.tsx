const BriefcaseIcon = ({
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
        fill={color}
        width={height}
        height={width}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 15h-4v-2H2v6c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-6h-8v2zm6-9h-2V4c0-1.105-.895-2-2-2H8c-1.105 0-2 .895-2 2v2H4c-1.105 0-2 .895-2 2v4h20V8c0-1.105-.895-2-2-2zm-4 0H8V4h8v2z" />
      </svg>
    </>
  );
};

export default BriefcaseIcon;
