import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchBasket } from "../../features/basketSlice";
import { Product } from "../../features/productSlice";

const Basket: FC = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(
    (state) => state.basketSlice.basket
  ) as Product[];
  const user = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    user && dispatch(fetchBasket({ id: user.basket }));
  }, [user, dispatch]);
  return (
    <div>
      <h1>Basket</h1>
      {basket.map((item) => item.name)}
    </div>
  );
};

export default Basket;
