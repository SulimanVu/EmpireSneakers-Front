import { FC } from "react";
import styles from "./profilePage.module.scss";
import { useAppSelector } from "../../app/hook";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import Footer from "../../components/Footer/Footer";

const ProfilePage: FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);

  return (
    <>
      <Header />
      <section className={styles.profile}>
        <aside>
          <h2>Привет: {user?.name}</h2>
          <span>Добро пожаловать !</span>
          <ProfileNav />
        </aside>
        <main>
          <Outlet />
        </main>
      </section>
      <Footer/>
    </>
  );
};

export default ProfilePage;
