import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchFavorites } from "../../features/favoriteSlice";
import { Product } from "../../features/productSlice";

const Favorites: FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state) => state.favoriteSlice.favorite
  ) as Product[];
  const user = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    user && dispatch(fetchFavorites({ id: user.favorite }));
  }, [user, dispatch]);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.map((item) => item.name)}
    </div>
  );
};

export default Favorites;
