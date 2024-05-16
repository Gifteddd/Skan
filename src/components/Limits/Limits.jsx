import React, { useState, useEffect } from "react";
import styles from "./Limits.module.scss";
import RequestToApi from "../../services/RequestToApi";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const Limits = () => {
    const isAuth = useSelector(state => state.account.isAuth);
    const [limits, setLimits] = useState(null);

    useEffect(() => {
        if (isAuth) {
            fetchLimits();
        }
    }, [isAuth]);

    const fetchLimits = () => {
        RequestToApi.getInfo()
            .then((res) => {
                setLimits(res.data.eventFiltersInfo);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        isAuth && (
            <div className={styles.userMenu__limitsBox}>
                {limits === null ? (
                    <Loading />
                ) : (
                    <>
                        <div className={styles.limitsBox__limits}>
                            <p className={styles.limits__p}>Использовано компаний</p>
                            <p className={styles.limits__p}>Лимит по компаниям</p>
                        </div>
                        <div className={styles.limitsBox__quantity}>
                            <span className={styles.quantity__usedCompany}>{limits.usedCompanyCount}</span>
                            <span className={styles.quantity__limitCompany}>{limits.companyLimit}</span>
                        </div>
                    </>
                )}
            </div>
        )
    );
};

export default Limits;
