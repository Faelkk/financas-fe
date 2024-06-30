const StatsIcon = ({
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
        <rect x="0" fill="none" width="24" height="24" />
        <g>
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zM9 17H7v-5h2v5zm4 0h-2v-7h2v7zm4 0h-2V7h2v10z" />
        </g>
      </svg>
    </>
  );
};

export default StatsIcon;
