import { FC, useEffect } from "react";
import rightArrow from "../../assets/icons/rightArrow.svg";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import styles from "./categories.module.scss";
import { filterProduct } from "../../features/productSlice";

interface CategoriesProps {
  _id: string;
  name: string;
}

const Categories: FC<CategoriesProps> = ({ name, _id }) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(
    (state) => state.productSlice.currentCategory
  );

  const handleSort = () => {
    dispatch(filterProduct(_id));
  };
  
  return (
    <li
      className={`${category == _id ? styles.active : styles.li}`}
      onClick={handleSort}
    >
      <span>{name}</span>
      <img src={rightArrow} alt="arrow" />
    </li>
  );
};

export default Categories;
