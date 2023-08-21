import { FC } from "react";
import styles from "./error404.module.scss";
import error404 from '../../assets/icons/Error404.png'
import { useNavigate } from "react-router-dom";

const Error404: FC = () => {
  const navigate = useNavigate();
  const handleClick = () :void => {
    navigate('/')
  }
  return (
      <div className={styles.error}>
        <img src={error404} alt="ошибка 404" />
        <span>Упс! Страница не найдена</span>
        <button onClick={handleClick}>Вернуться на главную</button>
      </div>
  );
};

export default Error404;
