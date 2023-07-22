import { FC, useEffect } from "react";
import styles from "./header.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchGlobalCategories } from "../../features/globalCategorySlice";
import logo from "../../assets/icons/logo.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Header: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const globalCategories = useAppSelector(
    (state) => state.globalCategory.globalCategories
  );

  useEffect(() => {
    dispatch(fetchGlobalCategories());
  }, [dispatch]);

  return (
    <div className={styles.header}>
      <header>
        <img src={logo} alt="logo" />
        <ul>
          {globalCategories.map((item) => (
            <li
              key={item._id}
              className={item._id === id ? styles.active : styles.none}
            >
              <Link className={styles.link} to={`/Gcategory/${item._id}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.input}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M16.6363 17.697C16.9292 17.9899 17.4041 17.9899 17.697 17.697C17.9899 17.4041 17.9899 16.9292 17.697 16.6363L16.6363 17.697ZM13.9167 8.83334C13.9167 11.6408 11.6408 13.9167 8.83334 13.9167V15.4167C12.4692 15.4167 15.4167 12.4692 15.4167 8.83334H13.9167ZM8.83334 13.9167C6.02589 13.9167 3.75 11.6408 3.75 8.83334H2.25C2.25 12.4692 5.19746 15.4167 8.83334 15.4167V13.9167ZM3.75 8.83334C3.75 6.02589 6.02589 3.75 8.83334 3.75V2.25C5.19746 2.25 2.25 5.19746 2.25 8.83334H3.75ZM8.83334 3.75C11.6408 3.75 13.9167 6.02589 13.9167 8.83334H15.4167C15.4167 5.19746 12.4692 2.25 8.83334 2.25V3.75ZM12.4697 13.5303L16.6363 17.697L17.697 16.6363L13.5303 12.4697L12.4697 13.5303Z"
              fill="#807D7E"
            />
          </svg>
          <input type="text" placeholder="Поиск..." />
        </div>

        <div className={styles.buttons}>
          <button>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99486 4.93029C8.49535 3.18277 5.99481 2.7127 4.11602 4.3129C2.23723 5.9131 1.97273 8.58855 3.44815 10.4811C4.67486 12.0547 8.38733 15.3734 9.60407 16.4475C9.7402 16.5677 9.80827 16.6278 9.88766 16.6514C9.95695 16.672 10.0328 16.672 10.1021 16.6514C10.1815 16.6278 10.2495 16.5677 10.3857 16.4475C11.6024 15.3734 15.3149 12.0547 16.5416 10.4811C18.017 8.58855 17.7848 5.89627 15.8737 4.3129C13.9626 2.72953 11.4944 3.18277 9.99486 4.93029Z"
                stroke="#807D7E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M9.99967 11.6668C12.3009 11.6668 14.1663 9.80135 14.1663 7.50016C14.1663 5.19898 12.3009 3.3335 9.99967 3.3335C7.69849 3.3335 5.83301 5.19898 5.83301 7.50016C5.83301 9.80135 7.69849 11.6668 9.99967 11.6668ZM9.99967 11.6668C6.31778 11.6668 3.33301 13.9054 3.33301 16.6668M9.99967 11.6668C13.6816 11.6668 16.6663 13.9054 16.6663 16.6668"
                stroke="#807D7E"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M2.5 3.3335H3.00526C3.85578 3.3335 4.56986 3.97391 4.6621 4.81942L5.3379 11.0142C5.43014 11.8597 6.14422 12.5002 6.99474 12.5002H14.205C14.9669 12.5002 15.6317 11.9836 15.82 11.2453L16.9699 6.73609C17.2387 5.68228 16.4425 4.65757 15.355 4.65757H5.5M5.52063 15.5209H6.14563M5.52063 16.1459H6.14563M14.6873 15.5209H15.3123M14.6873 16.1459H15.3123M6.66667 15.8335C6.66667 16.2937 6.29357 16.6668 5.83333 16.6668C5.3731 16.6668 5 16.2937 5 15.8335C5 15.3733 5.3731 15.0002 5.83333 15.0002C6.29357 15.0002 6.66667 15.3733 6.66667 15.8335ZM15.8333 15.8335C15.8333 16.2937 15.4602 16.6668 15 16.6668C14.5398 16.6668 14.1667 16.2937 14.1667 15.8335C14.1667 15.3733 14.5398 15.0002 15 15.0002C15.4602 15.0002 15.8333 15.3733 15.8333 15.8335Z"
                stroke="#807D7E"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
