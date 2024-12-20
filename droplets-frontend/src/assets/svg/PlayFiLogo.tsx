import * as Types from "@/types";

function PlayFiLogo(props: Types.OldChainLogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
      <defs>
        <linearGradient
          id="b"
          x1="11"
          x2="3.262"
          y1="4.177"
          y2="9.224"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FEB74B" />
          <stop offset="0.37" stopColor="#FF56CB" />
          <stop offset="1" stopColor="#597FFB" />
        </linearGradient>
        <clipPath id="a">
          <circle cx="7" cy="7" r="7" />
        </clipPath>
      </defs>
      <circle cx="7" cy="7" r="7" fill="#1C2737" />
      <g clipPath="url(#a)">
        <path
          fill="url(#b)"
          d="M4.077 4.764L7 3.174l2.923 1.59v3.472L7 9.826l-.615-.334v1.173L7 11l4-2.177V4.177L7 2 3 4.177v4.646l2.77 1.507V5.803L7 5.183l1.23.62v1.394L7 7.817l-.615-.31v1.151l.615.31 2.308-1.162V5.194L7 4.032 4.692 5.194V8.57l-.615-.335V4.764Z"
        />
      </g>
    </svg>
  );
}
export default PlayFiLogo;
