import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { ReactComponent as Man } from "./Man.svg";
import { ReactComponent as Folders } from "./folders.svg";
import { ReactComponent as Document } from "./Document.svg";
import styles from "./RequestPage.module.scss";
import CheckToken from "../../components/CheckToken";
import RequestWindow from "../../components/RequestWindow/RequestWindow";

export default function RequestPage() {
    return (
        <>
            <CheckToken unauthRedirect="/" />
            <Header />
            <main className={styles.requestPage__container}> 
                <div className={styles.container__description}>
                    <h1 className={styles.description__h}>Найдите необходимые <br /> данные в пару кликов.</h1>
                    <Document className={styles.description__img}/>
                    <p className={styles.description__p}>Задайте параметры поиска. <br /> Чем больше заполните, тем точнее поиск</p>
                    <RequestWindow className={styles.description__requestWindow}/>
                </div>
                <div className={styles.container__images}>
                    <div className={styles.images__box_img}>
                        <Document className={styles.box_img_document}/>
                        <Folders className={styles.box_img_folders}/>
                    </div>
                    <Man className={styles.images_man}/>
                </div>
            </main>
            <Footer />
        </>
    );
}
