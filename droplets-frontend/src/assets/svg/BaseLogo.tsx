import React from "react";

interface Props {
  className?: string;
}

function BaseLogo(props: Props) {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" {...props}>
      <g>
        <path
          fill="#0052FF"
          d="M6.988 14C10.86 14 14 10.866 14 7s-3.14-7-7.012-7A7.008 7.008 0 000 6.412h9.269v1.176H0A7.008 7.008 0 006.988 14z"
        ></path>
      </g>
    </svg>
  );
}

export default BaseLogo;
