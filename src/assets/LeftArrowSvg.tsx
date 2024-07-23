


type IconPropType = {
  className: string;
};
const LeftArrow = ({className}:IconPropType) => (
  <svg
    width={19}
    height={16}
    viewBox="0 0 19 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // {...}
  >
    <path
      d="M7.83334 14.5L1.33334 8M1.33334 8L7.83334 1.5M1.33334 8L17.5833 8"
      stroke="#F7F7F7"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default LeftArrow;
