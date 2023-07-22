import { FC } from "react";
import styles from "./signin.module.scss"

const SignIn: FC = () => {
    return (
        <div className={styles.signin}>

           <h1 className={styles.sign_title}>
           Sign In 
           </h1>

        </div>
    );
};

export default SignIn;