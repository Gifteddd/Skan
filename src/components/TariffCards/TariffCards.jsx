import React from "react";
import styles from "./TariffCards.module.scss";
import lamp from "./lamp.svg";
import aim from "./aim.svg";
import laptop from "./laptop.svg";
import check from "./check.svg";

function TariffCard({ title, description, price, oldPrice, currentTariff, onClick, svg }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHead}>
                <div className={styles.cardHeadText}>
                    <h2 className={styles.cardTitle}>{title}</h2>
                    <p className={styles.cardText}>{description}</p>
                </div>
                <img className={styles.cardSvg} src={svg} alt="icon" />
            </div>
            <div className={styles.cardTextField}>
                {currentTariff && <div className={styles.currentTariff}>Текущий тариф</div>}
                <div className={styles.textFieldContainer}>
                    <div className={styles.price}>
                        <div className={styles.newPrice}>{price} ₽</div>
                        <div className={styles.oldPrice}>{oldPrice} ₽</div>
                    </div>
                    <div className={styles.description}>
                        <p className={styles.descriptionText}>В тариф входит:</p>
                        <div className={styles.descriptionStrokeBox}>
                            <img src={check} alt="check" />
                            <p className={styles.descriptionText}>Безлимитная история запросов</p>
                        </div>
                        {/* Остальные пункты тарифа */}
                        <button className={styles.button} onClick={onClick}>{currentTariff ? "Перейти в личный кабинет" : "Подробнее"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TariffCards({ current }) {
    return (
        <div className={styles.cards}>
            <TariffCard
                title="Beginner"
                description="Для HR и фрилансеров"
                price={799}
                oldPrice={1200}
                currentTariff={current}
                onClick={() => console.log("Beginner clicked")}
                svg={lamp}
            />
            <TariffCard
                title="Pro"
                description="Для небольшого исследования"
                price={1299}
                oldPrice={2600}
                currentTariff={false}
                onClick={() => console.log("Pro clicked")}
                svg={aim}
            />
            <TariffCard
                title="Business"
                description="Для корпоративных клиентов"
                price={2379}
                oldPrice={3700}
                currentTariff={false}
                onClick={() => console.log("Business clicked")}
                svg={laptop}
            />
        </div>
    );
}

export default TariffCards;
