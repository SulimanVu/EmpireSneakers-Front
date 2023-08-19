import { FC } from 'react';
import styles from "./basketEmpty.module.scss";
import emptyBasket from '../../assets/icons/BasketEmpty.png'

const BasketEmpty: FC = () => {
    return (
        <div className={styles.emptyBasket}>
            <img src={emptyBasket} alt="пустая корзина" />
            <span>Ваша корзина пуста и печальна :(</span>
            <button>Затариться</button>
        </div>
    );
};

export default BasketEmpty;