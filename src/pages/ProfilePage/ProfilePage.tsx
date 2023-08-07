import { FC, useEffect } from "react";
import styles from "./profilePage.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import order from "../../assets/icons/order.svg";
import favorite from "../../assets/icons/heart.svg";
import profile from "../../assets/icons/profile.svg";
import signOut from "../../assets/icons/signOut.svg";
import { getUser } from "../../features/userSlice";

const ProfilePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId: string | null | undefined = useAppSelector(
    (state) => state.applicationSlice.userId
  );
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

  useEffect(() => {
    userId && dispatch(getUser({ id: userId }));
  }, [dispatch, userId]);

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
            <li onClick={navigateHandler} title="logOut">
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
