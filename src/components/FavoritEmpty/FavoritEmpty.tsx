import { FC } from "react";
import styles from "./favoritEmpty.module.scss";
import favoritEmpty from '../../assets/icons/FavoritEmpty.png'

const FavoritEmpty: FC = () => {
  return (
    <div className={styles.favoritEmpty}>
      <img src={favoritEmpty} alt="нет избранных" />
      <span>У вас нет избранных товаров</span>
      <button>Вернуться к товарам</button>
    </div>
  );
};

export default FavoritEmpty;
