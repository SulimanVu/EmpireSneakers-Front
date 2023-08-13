import { FC } from "react";
import styles from "./productCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { IFavorite, addToFavorite, deleteToFavorite } from "../../features/favoriteSlice";
import { addToBasket } from "../../features/basketSlice";
import HeartSVG from "../../assets/icons/HeartSVG";

interface sizesProps {
  size: number;
  quantity: number;
}

interface ProductCardProps {
  _id: string;
  name: string;
  title: string;
  price: number;
  photo: string;
  sizes: sizesProps[];
}

const ProductCard: FC<ProductCardProps> = ({
  _id,
  name,
  title,
  price,
  sizes,
  photo,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.applicationSlice.userId);
  const user = useAppSelector((state) => state.userSlice.user);
  const favorites = useAppSelector((state) =>
    state.favoriteSlice.favorite.find(
      (item: IFavorite) => item.product._id === _id
    )
  );

  const currentSize = sizes[0].size;

  const handleAddFavorite = () => {
    if (userId) {
      if (!favorites) {
        dispatch(
          addToFavorite({
            id: user.favorite,
            productId: _id,
            size: currentSize,
          })
        );
      } else {
        dispatch(
          deleteToFavorite({
            id: user.favorite,
            productId: _id,
            size: currentSize,
          })
        );
      }
    }

  };

  const handleAddBasket = () => {
    if (userId) {
      dispatch(
        addToBasket({ id: user.basket, productId: _id, size: currentSize })
      );
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.productImg}>
        <img src={`http://localhost:3010/${photo[0]}`} alt="Футболка" />
      </div>
      <div className={styles.favorite} onClick={handleAddFavorite}>
        <HeartSVG className={favorites ? styles.active : styles.none} />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.description}>
          <div className={styles.title}>
            <span>{name}</span>
            <span>{title}</span>
          </div>
          <button>${price}</button>
        </div>
        <button onClick={handleAddBasket} className={styles.buy}>
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
