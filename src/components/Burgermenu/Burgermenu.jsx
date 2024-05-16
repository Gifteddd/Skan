import React, { useState } from "react";
import styles from "./Burgermenu.module.scss";
import { ReactComponent as Logo1 } from "../Header/logo.svg";
import { ReactComponent as Logo2 } from "../Footer/logo.svg";
import { ReactComponent as Burger } from "./burger.svg";
import { ReactComponent as Close } from "./close.svg";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../storage/actions";
import Limits from "../Limits/Limits";

function Burgermenu() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const isAuth = useSelector(state => state.account.isAuth);
    const dispatch = useDispatch();

    const menuClickHandler = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {!isMenuOpen ? (
                <div className={styles.burgermenu__container}>
                    <Logo1 className={styles.container__logo} />
                    <Limits />
                    <button className={styles.container__burger_btn} onClick={menuClickHandler}>
                        <Burger />
                    </button>
                </div>
            ) : (
                <div className={styles.burgermenu__menu}>
                    <div className={styles.menu__container}>
                        <Logo2 className={styles.menu__logo} />
                        <Close className={styles.menu__close} onClick={menuClickHandler} />
                    </div>
                    <nav className={styles.menu__select}>
                        <NavLink to="/" className={styles.menu__link}>
                            Главная
                        </NavLink>
                        <NavLink to="/" className={styles.menu__link}>
                            Тарифы
                        </NavLink>
                        <NavLink to="/" className={styles.menu__link}>
                            FAQ
                        </NavLink>
                    </nav>
                    <button className={styles.menu__btn1}>Зарегистрироваться</button>
                    {!isAuth ? (
                        <button className={styles.menu__btn2}>
                            <Link to="/auth" onClick={menuClickHandler} className={styles.btn2__link}>
                                Войти
                            </Link>
                        </button>
                    ) : (
                        <button className={styles.menu__btn2} onClick={() => dispatch(setAuth(false))}>
                            Выйти
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

export default Burgermenu;
