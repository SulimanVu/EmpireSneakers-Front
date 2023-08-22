import { FC } from "react";
import styles from "./profileNav.module.scss";
import Heart from "../../assets/icons/HeartSVG";
import OrderSVG from "../../assets/icons/OrderSVG";
import SignOutSVG from "../../assets/icons/SignOutSVG";
import ProfileSVG from "../../assets/icons/ProfileSVG";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileNav: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path: string[] = location.pathname.split("/");

  const navigateHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const navPath: string = e.currentTarget.title;
    if (navPath == "logOut") {
      navigate("/");
      localStorage.removeItem("token");
    } else {
      navigate("/my_accaunt/" + navPath);
    }
  };
  return (
    <ul className={styles.list}>
      <li
        className={path.includes("basket") ? styles.active : styles.none}
        onClick={navigateHandler}
        title="basket"
      >
        <OrderSVG />

        <span>Моя корзина</span>
      </li>
      <li
        className={path.includes("favorites") ? styles.active : styles.none}
        onClick={navigateHandler}
        title="favorites"
      >
        <Heart />
        <span>Избранные</span>
      </li>
      <li
        className={path.includes("personal_info") ? styles.active : styles.none}
        onClick={navigateHandler}
        title="personal_info"
      >
        <ProfileSVG />
        <span>Мой аккаунт</span>
      </li>
      <li onClick={navigateHandler} title="logOut">
        <SignOutSVG />
        <span>Выйти из аккаунта</span>
      </li>
    </ul>
  );
};

export default ProfileNav;
