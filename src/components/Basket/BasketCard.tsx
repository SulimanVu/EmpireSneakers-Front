import { FC, useState } from "react";
import { useAppDispatch } from "../../app/hook";
import styles from "./basketCard.module.scss";
import { Product } from "../../features/productSlice";
import deleteIcon from "../../assets/icons/deletecon.svg";
import increment from "../../assets/icons/increment.svg";
import decrement from "../../assets/icons/decrement.svg";

interface BasketCardProps {
  product: Product;
  size: number;
}

const BasketCard: FC<BasketCardProps> = ({ product, size }) => {
  const [value, setValue] = useState<number>(1);

  const handleAmoutInc = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.nodeValue);
    setValue(() => value + 1);
  };
  const handleAmoutDec = () => {
    setValue(() => value - 1);
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
      <div className={styles.delete}>
        <img src={deleteIcon} alt="delete" />
      </div>
    </div>
  );
};

export default BasketCard;
