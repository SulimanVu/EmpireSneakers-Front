import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import styles from "./basketCard.module.scss";
import { Product } from "../../features/productSlice";
import deleteIcon from "../../assets/icons/deletecon.svg";
import increment from "../../assets/icons/increment.svg";
import decrement from "../../assets/icons/decrement.svg";
import { deleteInBasket } from "../../features/basketSlice";

interface BasketCardProps {
  product: Product;
  size: number;
}

const BasketCard: FC<BasketCardProps> = ({ product, size }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);

  const [value, setValue] = useState<number>(1);

  const handleAmoutInc = () => {
    setValue(() => value + 1);
  };
  const handleAmoutDec = () => {
    value > 1 ? setValue(() => value - 1) : null;
  };
  const handleDeleteProduct = () => {
    dispatch(
      deleteInBasket({ _id: user.basket, product: product._id, size: size })
    );
  };
  return (
    <div className={styles.basketCard}>
      <div className={styles.productDetails}>
        <img src={`http://localhost:3010/${product.photo}`} alt="image" />
        <div className={styles.description}>
          <h5>{product.name}</h5>
          <span>Размер: {size}</span>
        </div>
      </div>
      <div className={styles.price}>{product.price}</div>
      <div className={styles.amount}>
        <div onClick={handleAmoutDec}>
          <img src={decrement} alt="inc" />
        </div>
        <div className={styles.value}>{value}</div>
        <div onClick={handleAmoutInc}>
          <img src={increment} alt="dec" />
        </div>
      </div>
      <div className={styles.total}>{product.price * value}</div>
      <button className={styles.buy}>Купить</button>
      <div onClick={handleDeleteProduct} className={styles.delete}>
        <img src={deleteIcon} alt="delete" />
      </div>
    </div>
  );
};

export default BasketCard;
