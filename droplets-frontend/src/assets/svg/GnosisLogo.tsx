import { ChainLogoProps } from "@/types";

function GnosisLogo({ ...props }: ChainLogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
      <rect width="14" height="14" fill="#04795B" rx="7"></rect>
      <path
        fill="#fff"
        d="M4.94 7.694c.287 0 .567-.096.794-.271L3.91 5.6a1.302 1.302 0 00.234 1.825c.229.173.507.269.794.269zM10.36 6.392c0-.287-.096-.567-.271-.794L8.266 7.42a1.299 1.299 0 002.094-1.028z"
      ></path>
      <path
        fill="#fff"
        d="M11.278 4.409l-.806.806A1.837 1.837 0 017.886 7.8L7 8.687l-.883-.883A1.837 1.837 0 013.53 5.217l-.413-.413-.393-.395a5 5 0 108.554 0z"
      ></path>
      <path
        fill="#fff"
        d="M10.617 3.549a4.997 4.997 0 00-7.584.409L7 7.928l3.967-3.97a4.843 4.843 0 00-.35-.41zM7 2.654c1.168 0 2.257.45 3.075 1.273L7 7.002 3.925 3.927A4.297 4.297 0 017 2.654z"
      ></path>
    </svg>
  );
}

export default GnosisLogo;
