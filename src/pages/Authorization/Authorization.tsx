import { FC } from "react";
import styles from "./authorization.module.scss";
import { Outlet } from "react-router-dom";
import logo from '../../acces/icons/logo.png'
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
const Authorization: FC = () => {
  return (
    <div className={styles.auth}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="logo" /></div>
        <div className={styles.signIn_signUp}>
          <div className={styles.btn_signIn}>Войти</div>
          <div className={styles.btn_signUp}>Зарегистрироваться</div>
        </div>
      </header>
      {/* <SignIn/> */}
      <SignUp/>
      <Outlet />
    </div>
  );
};

export default Authorization;
