import React from "react";
import styles from "./alert.module.scss";
import { Alert, AlertTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { alertState } from "./alertState";

interface AlertProps {
  alert: alertState;
  message: string;
  setOpenAlert: (openAlert: boolean) => void;
}

const CustomAlert = React.memo(
  ({ alert, message, setOpenAlert }: AlertProps) => {
    const time = alert === "error" ? 3000 : 900;

    console.log("alert");

    setTimeout(() => {
      setOpenAlert(false);
    }, time);

    return (
      <div className={styles.alert}>
        <Alert
          onClose={() => setOpenAlert(false)}
          variant="filled"
          severity={alert}
        >
          {alert === "error" && <div className={styles.progress}></div>}
          <AlertTitle>{message}</AlertTitle>
          <span>
            {alert === "error" && (
              <Link to={"/authorization/signUp"}>
                Перейдите на страницу авторизации
              </Link>
            )}
          </span>
        </Alert>
      </div>
    );
  }
);

export default CustomAlert;
