import { FC } from "react";
import styles from "./error404.module.scss";
import error404 from '../../assets/icons/Error404.png'

const Error404: FC = () => {
  return (
      <div className={styles.error}>
        <img src={error404} alt="ошибка 404" />
        <span>Упс! Страница не найдена</span>
        <button>Вернуться на главную</button>
      </div>
  );
};

export default Error404;
