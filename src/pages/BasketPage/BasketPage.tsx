import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { IBasket, fetchBasket } from "../../features/basketSlice";
import styles from "./basketPage.module.scss";
import Basket from "../../components/Basket/BasketCard";

const BasketPage: FC = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(
    (state) => state.basketSlice.basket
  ) as IBasket[];
  const user = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    user && dispatch(fetchBasket({ id: user.basket }));
  }, [user, dispatch]);

  return (
    <div className={styles.basketPage}>
      <div className={styles.products}>
        <div className={styles.navBlock}>
          <div className={styles.navInfo}>
            <div>Описание товара</div>
            <div>Цена</div>
            <div>Колличество</div>
            <div>Итого</div>
            <div>Купить</div>
            <div>Удалить</div>
          </div>
        </div>
        {basket.map((item) => (
          <Basket
            key={item?.product?._id}
            product={item.product}
            size={item?.size}
          />
        ))}
      </div>
    </div>
  );
};

export default BasketPage;
