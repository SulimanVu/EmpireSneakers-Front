import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { IFavorite, fetchFavorites } from "../../features/favoriteSlice";
import styles from "./favorites.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import FavoritEmpty from "../FavoritEmpty/FavoritEmpty";

const Favorites: FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.favoriteSlice.favorite
  ) as IFavorite[];
  const user = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    user && dispatch(fetchFavorites({ id: user.favorite }));
  }, [user, dispatch]);  

  if( !favorites.length ){
    return <FavoritEmpty />
  }
  return (
    <div className={styles.favoriteBlock}>
      {favorites.map((item) => {
        return <ProductCard key={item.product._id} {...item.product} />;
      })}
    </div>
  );
};

export default Favorites;
