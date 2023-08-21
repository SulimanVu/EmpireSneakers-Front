import { SVGProps } from "react";

const DecrementSVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="11"
      height="2"
      viewBox="0 0 11 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Icon"
        d="M10.2412 1L1 1"
        stroke="#3C4242"
        strokeWidth="1.03964"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DecrementSVG;
