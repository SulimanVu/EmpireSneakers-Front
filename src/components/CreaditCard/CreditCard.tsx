import { FC, useState } from "react";
import styles from "./creditCard.module.scss";
import GooglePlaySVG from "../../assets/icons/GooglePlaySVG";
import VisaSVG from "../../assets/icons/VisaSVG";
import PayPalSVG from "../../assets/icons/PayPalSVG";
import PayPassSVG from "../../assets/icons/PayPassSVG";

enum cardTypeVariants {
  credit = "credit",
  cash = "cash",
  paypol = "paypol",
}
const CreditCard: FC = () => {
  const [cardType, setCardType] = useState<cardTypeVariants>(
    cardTypeVariants.credit
  );

  return (
    <>
      <div className={styles.cardBlock}>
        <div className={styles.creditCard}>
          <div
            className={styles.circle}
            onClick={() => setCardType(cardTypeVariants.credit)}
          >
            {cardType === cardTypeVariants.credit && <div></div>}
          </div>
          <h2>Кредитной картой</h2>
        </div>
        <div className={styles.creditType}>
          <GooglePlaySVG />
          <VisaSVG />
          <PayPalSVG />
          <PayPassSVG />
        </div>
        <div className={styles.inputs}>
          <input type="text" placeholder="Номер карты" />
          <input type="text" placeholder="Название карты" />
          <input type="text" placeholder="Дата действия (мм/гг)" />
          <input type="text" placeholder="Пароль" />
        </div>
        <hr />
        <div className={styles.creditCard}>
          <div
            className={styles.circle}
            onClick={() => setCardType(cardTypeVariants.cash)}
          >
            {cardType === cardTypeVariants.cash && <div></div>}
          </div>
          <h2>Оплата при получении</h2>
        </div>
      </div>
      <button className={styles.buy}>Приобрести</button>
    </>
  );
};

export default CreditCard;
