import * as Types from "@/types";

function ZksyncLogo(props: Types.OldChainLogoProps) {
  const { customScale, size = "sm", ...rest } = props;
  return (
    <svg
      id="zksync-era"
      viewBox="0 0 60 60"
      fill="none"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="60" rx="30" fill="#1E69FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52 30.0025L39.9567 18V26.7879L28 35.5861L39.9567 35.5962V42L52 30.0025Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 30L20.0434 42V33.2815L32 24.4102L20.0434 24.4V18L8 30Z"
        fill="white"
      />
    </svg>
  );
}

export default ZksyncLogo;
