import * as Types from "@/types";

const HaqqLogo = ({
  randomLogoId = "haqqLogoId",
  ...props
}: Types.OldChainLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 70 70"
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M34.568 0 45.15 9.131l13.86 1.12 1.106 14.034L69.136 35l-9.019 10.715-1.106 14.034-13.86 1.12L34.568 70l-10.583-9.131-13.86-1.12-1.106-14.034L0 35l9.019-10.715 1.106-14.034 13.86-1.12L34.568 0Z"
    />
  </svg>
);
export default HaqqLogo;
