import { FC, useState } from "react";
import RightArrowSVG from "../../assets/icons/RightArrowSVG";
import styles from "./pricePopUp.module.scss";

const PricePopUp: FC = () => {
  const [priceDrop, setPriceDrop] = useState(false);
  const [priceMinValue, setPriceMinValue] = useState("");
  const [priceMaxValue, setPriceMaxValue] = useState("");

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMinValue(e.target.value.replace(/[^\d.]/g, ""));
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMaxValue(e.target.value.replace(/[^\d.]/g, ""));
  };

  return (
    <div className={styles.priceSection}>
      <div onClick={() => setPriceDrop(!priceDrop)} className={styles.price}>
        <span>Price</span>
        <RightArrowSVG
          className={priceDrop ? styles.rotated : styles.norotated}
        />
      </div>
      <div
        className={priceDrop ? styles.slidecontainer : styles.noslidecontainer}
      >
        <div className={styles.inputs}>
          <div>
            <span>От</span>
            <input
              onChange={handlePriceMinChange}
              type="text"
              value={priceMinValue}
              maxLength={4}
            />
          </div>
          <div>
            <span>До</span>
            <input
              onChange={handlePriceMaxChange}
              type="text"
              value={priceMaxValue}
              maxLength={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePopUp;
