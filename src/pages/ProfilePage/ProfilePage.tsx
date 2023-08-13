import { FC } from "react";
import styles from "./profilePage.module.scss";
import { useAppSelector } from "../../app/hook";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Heart from "../../assets/icons/HeartSVG";
import OrderSVG from "../../assets/icons/OrderSVG";
import SignOutSVG from "../../assets/icons/SignOutSVG";
import ProfileSVG from "../../assets/icons/ProfileSVG";

const ProfilePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.userSlice.user);
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
    <>
      <Header />
      <section className={styles.profile}>
        <aside>
          <h2>Привет: {user?.name}</h2>
          <span>Добро пожаловать !</span>
          <ul>
            <li
              className={path.includes("basket") ? styles.active : styles.none}
              onClick={navigateHandler}
              title="basket"
            >
              <div>
                <OrderSVG />
              </div>
              <span>Моя корзина</span>
            </li>
            <li
              className={
                path.includes("favorites") ? styles.active : styles.none
              }
              onClick={navigateHandler}
              title="favorites"
            >
              <div>
                <Heart />
              </div>
              <span>Избранные</span>
            </li>
            <li
              className={
                path.includes("personal_info") ? styles.active : styles.none
              }
              onClick={navigateHandler}
              title="personal_info"
            >
              <div>
                <ProfileSVG />
              </div>
              <span>Мой аккаунт</span>
            </li>
            <li onClick={navigateHandler} title="logOut">
              <div>
                <SignOutSVG />
              </div>
              <span>Выйти из аккаунта</span>
            </li>
          </ul>
        </aside>

        <main>
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default ProfilePage;
