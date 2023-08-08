import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { IBasket, fetchBasket } from "../../features/basketSlice";

const Basket: FC = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(
    (state) => state.basketSlice.basket
  ) as IBasket[];
  const user = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    user && dispatch(fetchBasket({ id: user.basket }));
  }, [user, dispatch]);

  return (
    <div>
      <h1>Basket</h1>
      {basket.map((item) => item.product.name)}
    </div>
  );
};

export default Basket;
