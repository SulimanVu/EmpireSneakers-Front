import { FC } from "react";
import styles from "./main.module.scss";
import Header from "../../components/Header/Header";

const Main: FC = () => {
  return (
    <div className={styles.main}>
      <Header />
      <h1>It`s Main page</h1>
    </div>
  );
};

export default Main;
