import { ChangeEvent, FC, useState } from "react";
import styles from "./signup.module.scss";
import { authSignUp } from "../../features/applicationSlice";
import { useNavigate } from "react-router-dom";
import eye from "../../assets/icons/eye.png";
import { useAppDispatch } from "../../app/hook";

const SignUp: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const handleSetPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const handleSignUp = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authSignUp({ login, password }));
    navigate("/authorization/signIn");
  };
  return (
    <div className={styles.signUp}>
      <h1>Sign Up</h1>
      <div className={styles.inputs}>
        <form onSubmit={handleSignUp}>
          <span>Имя</span>
          <input type="text" />
          <span>Email</span>
          <input type="text" />
          <span>Логин</span>
          <input type="text" value={login} onChange={handleSetName} />
          <div className={styles.password}>
            <span>Пароль</span>
            <img src={eye} alt="eye" />
          </div>
          <input type="password" value={password} onChange={handleSetPass} />
          <span className={styles.support}>Забыли пароль?</span>
          <button type="submit">Зарегистрироваться</button>
          <span className={styles.support_2}>Есть аккаунт? Войти</span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
