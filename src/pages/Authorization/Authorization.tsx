import { FC } from "react";
import styles from "./authorization.module.scss";
import { Outlet } from "react-router-dom";
import logo from "../../acces/icons/logo.png";
import { Link } from "react-router-dom";
const Authorization: FC = () => {
  return (
    <div className={styles.auth}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.signIn_signUp}>
          <Link to={`/authorization/signIn`}>
            <div className={styles.btn_signIn}>Войти</div>
          </Link>
          <Link to={`/authorization/signUp`}>
            <div className={styles.btn_signUp}>Зарегистрироваться</div>
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Authorization;
