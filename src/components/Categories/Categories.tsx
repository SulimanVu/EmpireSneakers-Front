import { FC } from "react";
import rightArrow from "../../assets/icons/rightArrow.svg";

interface CategoriesProps {
  id: string;
  name: string;
}
const Categories: FC<CategoriesProps> = ({ name, id }) => {
  return (
    <li>
      <span>{name}</span>
      <img src={rightArrow} alt="arrow" />
    </li>
  );
};

export default Categories;
