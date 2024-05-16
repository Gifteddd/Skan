import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../storage/actions";
import Burgermenu from "../Burgermenu/Burgermenu";
import Limits from "../Limits/Limits";
import logo from "./logo.svg";
import line from "./line.svg";
import avatar from "./avatarUser.svg";
import styles from "./Header.module.scss";

function Header() {
    const isAuth = useSelector(state => state.account.isAuth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setAuth(false));
    };

    return (
        <>
            <Burgermenu />
            <div className={styles.header}>
                <img src={logo} alt="logo" />
                <nav>
                    <NavLink to="/" className={styles.header_link}>Главная</NavLink>
                    <NavLink to="/" className={styles.header_link}>Тарифы</NavLink>
                    <NavLink to="/" className={styles.header_link}>FAQ</NavLink>
                </nav>
                {!isAuth ? (
                    <div className={styles.header_buttons}>
                        <button className={styles.header_button1}>Зарегистрироваться</button>
                        <img className={styles.header_line} src={line} alt="line" />
                        <button className={styles.header_button2}>
                            <Link to="/auth" className={styles.button2__link}>Войти</Link>
                        </button>
                    </div>
                ) : (
                    <div className={styles.header_userMenu}>
                        <Limits />
                        <div className={styles.userMenu__user}>
                            <div className={styles.user__name_and_button}>
                                <p className={styles.name_and_button__name}>Алексей А. </p>
                                <button className={styles.name_and_button__btn} onClick={handleLogout}>Выйти</button>
                            </div>
                            <img className={styles.name_and_button__avatar} src={avatar} alt="avatar" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Header;

