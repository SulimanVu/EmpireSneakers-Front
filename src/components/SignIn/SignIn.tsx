import { ChangeEvent, FC, useState } from "react";
import styles from "./signin.module.scss"
import { useDispatch } from "react-redux";
import { authSignIn } from "../../features/applicationSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import eye from '../../assets/icons/eye.png'

const SignIn: FC = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
const loading = useSelector((state:RootState) => state.applicationSlice.loading)
    const error = useSelector((state: RootState) => state.applicationSlice.error);
    const dispatch = useDispatch()
    const handleSetPass = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
    }
    const navigate = useNavigate()

    const handleSignIn = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        dispatch(authSignIn({ login, password }))
        navigate('/')
    }

    if (error) {
        return <div>{error}</div>
    }
    console.log(loading);
    
    
      if (loading) {
        console.log(loading);
        
        return  <div> ...</div>
      }
    return (
        <div className={styles.signIn}>
            <h1>
                Sign In
            </h1>
            <div className={styles.inputs}>
                <form onSubmit={handleSignIn}>
                    <span>Имя</span>
                    <input
                        type="text"
                        value={login}
                        onChange={handleSetName}
                    />
                    <div className={styles.password}>
                        <span>Пароль</span>
                        <img src={eye} alt="eyeSvg" />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={handleSetPass}
                    />
                    <span className={styles.support}>Забыли пароль?</span>

                    <button type='submit'>Войти</button>

                    <span className={styles.support_2}>Нет аккаунта? Зарегистрироваться</span>
                </form>
            </div>
        </div>

    );
};

export default SignIn;