import { FC } from "react";
import styles from "./main.module.scss";
import Header from "../../components/Header/Header";
import MainSlider from "../../components/MainSlider/MainSlider";

const Main: FC = () => {
  return (
    <div className={styles.main}>
      <Header />
      <MainSlider />
    </div>
  );
};

export default Main;
