import { SVGProps } from "react";

const RightArrowSVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="7"
      height="13"
      viewBox="0 0 7 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.7415L5.73782 7.00373C6.08739 6.65416 6.08739 6.08739 5.73782 5.73782L1 1"
        stroke="rgb(255, 255, 255)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RightArrowSVG;
