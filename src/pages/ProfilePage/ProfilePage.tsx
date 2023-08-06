import { FC } from "react";
import styles from "./profilePage.module.scss";
import { useAppSelector } from "../../app/hook";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import order from "../../assets/icons/order.svg";
import favorite from "../../assets/icons/heart.svg";
import profile from "../../assets/icons/profile.svg";
import signOut from "../../assets/icons/signOut.svg";

const ProfilePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.applicationSlice.userId);
  const user = useAppSelector((state) =>
    state.userReducer.users.find((user) => user._id === userId)
  );
  const path: string[] = location.pathname.split("/");

  const navigateHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const navPath: string = e.currentTarget.title;
    if (navPath === "logOut") {
      localStorage.removeItem("token");
      navigate("/");
    }
    navigate("/my_accaunt/" + navPath);
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
                <img src={order} alt="order" />
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
                <img src={favorite} alt="favorite" />
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
                <img src={profile} alt="personal_info" />
              </div>
              <span>Мой аккаунт</span>
            </li>
            <li
              className={path.includes("logOut") ? styles.active : styles.none}
              onClick={navigateHandler}
              title="logOut"
            >
              <div>
                <img src={signOut} alt="logout" />
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
