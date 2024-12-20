import { OldChainLogoProps } from "@/types";
import * as React from "react";
const HumanodeLogo = ({
  randomLogoId = "humanodeLogoId",
  ...props
}: OldChainLogoProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
    <rect width={14} height={14} fill="#fff" rx={7} />
    <path
      fill={`url(#humanode${randomLogoId})`}
      fillRule="evenodd"
      d="M10.553 11.27c.134-.028.27-.042.407-.041a.629.629 0 0 1 .54.271l-4.583-9L2.5 11.39c.6-.333 1.415-.658 2.444-.458.286.055.45.097.564.126.192.048.238.06.48.042.384-.028 1.178-.362 1.58-.9.242-.323.413 0 .577.309.107.202.21.396.326.397.103 0 .123-.03.217-.173l.04-.062c.132-.196.64-.098.854.587 0 0 .025-.304.319-.31.178-.005.258.119.322.22.042.065.077.12.13.124a.765.765 0 0 0 .2-.022Z"
      clipRule="evenodd"
    />
    <defs>
      <linearGradient
        id={`humanode${randomLogoId}`}
        x1={5.659}
        x2={12.354}
        y1={3.033}
        y2={10.76}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B2346B" />
        <stop offset={0.471} stopColor="#FA5D53" />
        <stop offset={1} stopColor="#FFC470" />
      </linearGradient>
    </defs>
  </svg>
);
export default HumanodeLogo;
