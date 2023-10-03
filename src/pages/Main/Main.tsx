import { FC } from "react";
import styles from "./main.module.scss";
import Header from "../../components/Header/Header";
import MainSlider from "../../components/MainSlider/MainSlider";
import Footer from "../../components/Footer/Footer";

const Main: FC = () => {
  return (
    <div className={styles.main}>
      <Header />
      <MainSlider />
      <Footer/>
    </div>
  );
};

export default Main;
