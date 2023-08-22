import { FC } from "react";
import styles from "./adminPage.module.scss";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

const AdminPage: FC = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <div className={styles.admin}>{id}</div>
    </>
  );
};

export default AdminPage;
