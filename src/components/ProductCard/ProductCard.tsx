import { FC, useState } from "react";
import styles from "./productCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  IFavorite,
  addToFavorite,
  deleteToFavorite,
} from "../../features/favoriteSlice";
import HeartSVG from "../../assets/icons/HeartSVG";
import CustomAlert from "../Alert/CustomAlert";
import { alertState } from "../Alert/alertState";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  _id: string;
  name: string;
  title: string;
  price: number;
  photo: [string];
}

const ProductCard: FC<ProductCardProps> = ({
  _id,
  name,
  title,
  price,
  photo,
}) => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.applicationSlice.userId);
  const user = useAppSelector((state) => state.userSlice.user);
  const favorites = useAppSelector((state) =>
    state.favoriteSlice.favorite.find(
      (item: IFavorite) => item.product._id === _id
    )
  );

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState<alertState>(alertState.success);

  // Заменить везда цифру 40 на нужный размер
  const handleAddFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (userId) {
      if (!favorites) {
        dispatch(
          addToFavorite({
            id: user.favorite,
            productId: _id,
            size: 40,
          })
        );
        setMessage(() => "Товар добавлен в избранное");
        setOpenAlert(true);
        setAlert(alertState.success);
      } else {
        dispatch(
          deleteToFavorite({
            id: user.favorite,
            productId: _id,
            size: 40,
          })
        );
        setMessage(() => "Товар удален из избранных");
        setOpenAlert(true);
        setAlert(alertState.success);
      }
    } else {
      setMessage(() => "Вы не вошли в аккаунт");
      setOpenAlert(true);
      setAlert(alertState.error);
    }
  };

  return (
    <>
      {openAlert && (
        <CustomAlert
          setOpenAlert={setOpenAlert}
          alert={alert}
          message={message}
        />
      )}
      <div className={styles.product} onClick={() => navigate(`/productDetail/${_id}`)}>
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
        </div>
      </div>
    </>
  );
};

export default ProductCard;
