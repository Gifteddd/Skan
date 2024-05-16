import React, { useEffect, useRef, useState, useCallback } from "react";
import { ReactComponent as Google } from "./google.svg";
import { ReactComponent as Facebook } from "./facebook.svg";
import { ReactComponent as Yandex } from "./yandex.svg";
import { ReactComponent as Padlock } from "./padlock.svg";
import { ReactComponent as GreenLine } from "./green_line.svg";
import { ReactComponent as GreyLine } from "./grey_line.svg";
import styles from "./Authorization.module.scss";
import { useDispatch } from "react-redux";
import RequestToApi from "../../services/RequestToApi";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../storage/actions";

function Authorization() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [isLoginError, setIsLoginError] = useState(false);
    const [isPassError, setIsPassError] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const onLoginChange = useCallback((e) => {
        setUserLogin(e.target.value);
        setIsLoginError(!e.target.value);
    }, []);

    const onPasswordChange = useCallback((e) => {
        setUserPassword(e.target.value);
        setIsPassError(!e.target.value);
    }, []);

    const valid = useCallback(() => {
        setIsCompleted(!isLoginError && !isPassError && userLogin && userPassword);
    }, [isLoginError, isPassError, userLogin, userPassword]);

    useEffect(() => {
        valid();
    }, [valid]);

    const refLogin = useRef();
    const refPassword = useRef();

    const onLoginClick = useCallback(async () => {
        refLogin.current.disabled = true;
        try {
            const response = await RequestToApi.login(userLogin, userPassword);
            dispatch(setAuth(true));
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("expire", response.data.expire);
            navigate("/");
        } catch (error) {
            setIsPassError(true);
        }
    }, [dispatch, navigate, userLogin, userPassword]);

    const onLoginKeyDown = useCallback((e) => {
        if (e.code === "Enter") {
            refPassword.current.focus();
        }
    }, []);

    const onPasswordKeyDown = useCallback((e) => {
        if (e.code === "Enter") {
            onLoginClick();
        }
    }, [onLoginClick]);

    return (
        <article className={styles.main_container}>
            <div className={styles.buttons_container}>
                <div className={styles.btn_box}>
                    <button className={styles.enter_btn}>Войти</button>
                    <GreenLine className={styles.lines}/>
                </div>
                <div className={styles.btn_box}>
                    <button className={styles.auth_btn} disabled>Зарегистрироваться</button>
                    <GreyLine className={styles.lines}/>
                </div>
            </div>
            <form className={styles.inputs_container}>
                <label htmlFor="login">Логин или номер телефона:</label>
                <input type="text" id="login" placeholder="login или +7(999)999-99-99"
                       className={isLoginError ? styles.red_input : ""} required
                       onChange={onLoginChange} onKeyDown={onLoginKeyDown}/>
                {isLoginError && <span className={styles.mistake}>Введите корректные данные</span>}
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" className={isPassError ? styles.red_input : ""}
                       onChange={onPasswordChange} onKeyDown={onPasswordKeyDown} ref={refPassword} required />
                {isPassError && <span className={styles.mistake}>Неправильный пароль</span>}
                <button className={styles.main_btn} ref={refLogin} onClick={onLoginClick} disabled={!isCompleted}>Войти</button>
                <button className={styles.recover_btn}>Восстановить пароль</button>
            </form>
            <div className={styles.icon_container}>
                <span>Войти через:</span>
                <div className={styles.icon_btns}>
                    <button className={styles.svg_btn}><Google className={styles.svg}/></button>
                    <button className={styles.svg_btn}><Facebook className={styles.svg} /></button>
                    <button className={styles.svg_btn}><Yandex className={styles.svg}/></button>
                </div>
            </div>
            <Padlock className={styles.img_padlock} />
        </article>
    );
}

export default Authorization;
