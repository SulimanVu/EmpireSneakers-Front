import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { IFavorite, fetchFavorites } from "../../features/favoriteSlice";
import styles from "./favorites.module.scss";

const Favorites: FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.favoriteSlice.favorite
  ) as IFavorite[];
  const user = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    user && dispatch(fetchFavorites({ id: user.favorite }));
  }, [user, dispatch]);

  return (
    <div className={styles.favoriteBlock}>
      <h1>Favorites</h1>
      {favorites.map((item) => {
        return (
          <div key={item.product._id} className={styles.favorite}>
            <div> Наименование: {item.product.name} </div>
            <div className={styles.size}>Размер:{item.size}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
