import * as Types from "@/types";

export default function ShimmerLogo(props: Types.OldChainLogoProps) {
  const { customScale, size = "sm", ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={size === "sm" ? "0 0 15 15" : "0 0 22 22"}
      {...rest}
    >
      <g
        clipPath="url(#clip0_3115_29104)"
        transform={`scale(${customScale || (size === "sm" ? 1 : 1.5)})`}
      >
        <path fill="#00E0CA" d="M14 0H0v14h14V0z"></path>
        <g fill="#00121F" opacity="0.9">
          <path d="M10.199 3.781a3.614 3.614 0 00-5.23-.073c-1.464 1.473-1.495 3.893-.07 5.406l.936-.942a2.539 2.539 0 01.05-3.5 2.344 2.344 0 013.388.04l.926-.93zM3.977 10.044a3.614 3.614 0 005.23.072c1.463-1.472 1.494-3.892.07-5.405l-.937.942a2.539 2.539 0 01-.05 3.5 2.344 2.344 0 01-3.387-.041l-.926.932z"></path>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_3115_29104">
          <rect width="14" height="14" fill="#fff" rx="7"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
