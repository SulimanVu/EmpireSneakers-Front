import { useEffect, useState } from "react";
import { fetchUsers, getUser } from "../../features/userSlice";
import styles from "./profile.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import profile from "../../assets/icons/profile.svg";

const Profile = () => {
  const dispatch = useAppDispatch();
  const userId: string | null | undefined = useAppSelector(
    (state) => state.applicationSlice.userId
  );
  const user = useAppSelector((state) => state.userReducer.user);

  const [nameInput, setNameInput] = useState(user?.name);
  const [emailInput, setEmailInput] = useState(user?.email);
  const [phoneInput, setPhoneInput] = useState(user?.phone);
  const [loginInput, setLoginInput] = useState(user?.login);
  const [passwordInput, setPasswordInput] = useState(user?.password);

  useEffect(() => {
    userId && dispatch(getUser({ id: userId }));
  }, [dispatch, userId]);

  return (
    <div className={styles.profile}>
      <h1>Profile</h1>

      <div className={styles.avatar}>
        {user?.avatar ? (
          <img src={`http://localhost:3010/${user.avatar}`} alt="avatar" />
        ) : (
          <img src={profile} alt="avatar" />
        )}
      </div>

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
