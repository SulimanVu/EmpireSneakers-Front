import { useState } from "react";
import styles from "./profile.module.scss";
import { useAppSelector } from "../../app/hook";
import ProfileSVG from "../../assets/icons/ProfileSVG";

const Profile = () => {
  const user = useAppSelector((state) => state.userSlice.user);

  const [nameInput, setNameInput] = useState(user?.name);
  const [emailInput, setEmailInput] = useState(user?.email);
  const [phoneInput, setPhoneInput] = useState(user?.phone);
  const [loginInput, setLoginInput] = useState(user?.login);
  const [passwordInput, setPasswordInput] = useState(user?.password);

  return (
    <div className={styles.profile}>
      <h2>Контактные данные</h2>
      <section className={styles.inputsBlock}>
        <div className={styles.input}>
          <div>
            <span>Ваше имя</span>
            <input
              onChange={(e) => setNameInput(e.target.value)}
              type="text"
              placeholder={user?.name}
              value={nameInput}
            />
          </div>
          <button>Изменить</button>
        </div>
        <div className={styles.input}>
          <div>
            <span>Почта</span>
            <input
              onChange={(e) => setEmailInput(e.target.value)}
              type="text"
              placeholder={user?.email}
              value={emailInput}
            />
          </div>
          <button>Изменить</button>
        </div>
        <div className={styles.input}>
          <div>
            <span>Номер телефона</span>
            <input
              onChange={(e) => setPhoneInput(e.target.value)}
              type="text"
              placeholder={user?.phone}
              value={phoneInput}
            />
          </div>
          <button>Изменить</button>
        </div>
        <div className={styles.input}>
          <div>
            <span>Логин</span>
            <input
              onChange={(e) => setLoginInput(e.target.value)}
              type="text"
              placeholder={user?.login}
              value={loginInput}
            />
          </div>
          <button>Изменить</button>
        </div>
        <div className={styles.input}>
          <div>
            <span>Пароль</span>
            <input
              onChange={(e) => setPasswordInput(e.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder={user?.password}
              value={passwordInput}
            />
          </div>
          <button>Изменить</button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
