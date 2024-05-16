import React, { useEffect } from "react";
import Authorization from "../../components/Authorization/Authorization";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ReactComponent as PeopleWithKey } from "./peopleKey.svg";
import styles from "./AuthPage.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const isAuth = useSelector(state => state.account.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate("/");
    }, [isAuth, navigate]); // Добавлены зависимости для useEffect

    return (
        <>
            <Header />
            <main className={styles.main_container}>
                <div className={styles.text_and_form_container}>
                    <p className={styles.text}> Для оформления подписки на тариф, необходимо авторизоваться.</p>
                    <PeopleWithKey className={styles.image} />
                </div>
                <Authorization className={styles.formAuth}/>
                <PeopleWithKey className={styles.image2} />
            </main>
            <Footer />
        </>
    );
}

