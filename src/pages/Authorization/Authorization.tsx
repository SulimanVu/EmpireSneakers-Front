import { FC } from "react";
import styles from "./authorization.module.scss";
import { Outlet } from "react-router-dom";

const Authorization: FC = () => {
  return (
    <div className={styles.auth}>
      Authorization
      <Outlet />
    </div>
  );
};

export default Authorization;
