import { FC } from "react";
import rightArrow from "../../assets/icons/rightArrow.svg";
import { useAppDispatch } from "../../app/hook";
import { getCurrentCategory } from "../../features/categoriesSlice";
import styles from "./categories.module.scss";
import { filterProduct } from "../../features/productSlice";

interface CategoriesProps {
  _id: string;
  name: string;
}
const Categories: FC<CategoriesProps> = ({ name, _id }) => {
  const dispatch = useAppDispatch();

  const handleSort = () => {
    dispatch(filterProduct(_id));
  };

  return (
    <li className={styles.li} onClick={handleSort}>
      <span>{name}</span>
      <img src={rightArrow} alt="arrow" />
    </li>
  );
};

export default Categories;
