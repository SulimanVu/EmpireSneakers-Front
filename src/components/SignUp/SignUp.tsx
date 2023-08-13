import { ChangeEvent, FC, useState } from "react";
import styles from "./signup.module.scss";
import { authSignUp } from "../../features/applicationSlice";
import { useNavigate } from "react-router-dom";
import eye from "../../assets/icons/eye.png";
import { useAppDispatch } from "../../app/hook";
import { Link } from "react-router-dom";

const SignUp: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSetLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const handleSetPass = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSetPhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSignUp = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authSignUp({ name, email, login, password, phone }));
    navigate("/authorization/signIn");
  };

  return (
    <div className={styles.signUp}>
      <h1>Sign Up</h1>
      <div className={styles.inputs}>
        <form onSubmit={handleSignUp}>
          <span>Имя</span>
          <input type="text" value={name} onChange={handleSetName} />
          <span>Email</span>
          <input type="text" value={email} onChange={handleSetEmail} />
          <span>Номер телефона</span>
          <input type="text" value={email} onChange={handleSetPhone} />
          <span>Логин</span>
          <input type="text" value={login} onChange={handleSetLogin} />
          <div className={styles.password}>
            <span>Пароль</span>
            <img src={eye} alt="eye" />
          </div>
          <input type="password" value={password} onChange={handleSetPass} />
          <span className={styles.support}>Забыли пароль?</span>
          <button type="submit">Зарегистрироваться</button>
          <Link to={`/authorization/signIn`}>
            <span className={styles.support_2}>Есть аккаунт? Войти</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
