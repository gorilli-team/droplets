import * as Types from "@/types";

function EthereumLogo(props: Types.OldChainLogoProps) {
  const { customScale, size = "sm", ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={size === "sm" ? "0 0 15 15" : "0 0 22 22"}
      {...rest}
    >
      <g transform={`scale(${customScale || (size === "sm" ? 1 : 1.5)})`}>
        <path
          d="M7.00021 14C10.8944 14 14.0004 10.894 14.0004 7.00001C14.0004 3.10597 10.8944 0 7.00021 0C3.10606 0 0 3.10597 0 7.00001C0 10.894 3.10606 14 7.00021 14Z"
          fill="#ECF2FB"
        />
        <path
          d="M7.03015 1.91016L6.95996 2.15222V9.17574L7.03015 9.24684L10.2409 7.31972L7.03015 1.91016Z"
          fill="#62688F"
        />
        <path
          d="M7.03069 1.91016L3.81982 7.31972L7.03069 9.24684V5.83782V1.91016Z"
          fill="#8A92B2"
        />
        <path
          d="M7.03028 9.86362L6.99072 9.9126V12.4145L7.03028 12.5317L10.243 7.9375L7.03028 9.86362Z"
          fill="#62688F"
        />
        <path
          d="M7.03068 12.5317V9.86362L3.81982 7.9375L7.03068 12.5317Z"
          fill="#8A92B2"
        />
        <path
          d="M7.03198 9.24691L10.2428 7.3198L7.03198 5.83789V9.24691Z"
          fill="#454A75"
        />
        <path
          d="M3.81982 7.3198L7.03068 9.24691V5.83789L3.81982 7.3198Z"
          fill="#62688F"
        />
      </g>
    </svg>
  );
}

export default EthereumLogo;
