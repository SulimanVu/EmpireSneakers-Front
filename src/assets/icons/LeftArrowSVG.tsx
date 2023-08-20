import { SVGProps } from "react";
import RightArrowSVG from "./RightArrowSVG";

const LeftArrowSVG = (props: SVGProps<SVGSVGElement>) => {
  return <RightArrowSVG style={{transform: "rotate(180deg"}} {...props} />;
};

export default LeftArrowSVG;
