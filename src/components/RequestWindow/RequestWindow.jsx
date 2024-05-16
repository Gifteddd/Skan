import React, { useEffect, useRef, useState } from "react";
import styles from "./RequestWindow.module.scss";
import 'react-day-picker/dist/style.css';
import DateRangeInputs from "./DateRangeInputs/DateRangeInputs";
import { validateInn } from "./validatateInn";
import RequestToApi from "../../services/RequestToApi"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHistogram, setHistogramDate, setPublicationsList } from "../../storage/actions";

export default function RequestWindow() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const innInputRef = useRef();
    const quantityInputRef = useRef();
    const btnRequestRef = useRef();

    const [innError, setInnError] = useState(false);
    const [ton, setTon] = useState('any');
    const [quantityError, setQuantityError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [completed, setCompleted] = useState(false);

    const [selectedStartDate, setSelectedStartDate] = useState("Дата начала");
    const [selectedEndDate, setSelectedEndDate] = useState("Дата конца");

    const tonalityOptions = [{value: 'any', label: 'Любая'}, {value: 'negative', label: 'Негативная'}, { value: 'positive', label: 'Позитивная' }];

    useEffect(() => {
        setCompleted(!innError && !quantityError && !dateError &&
            quantityInputRef.current.value &&
            innInputRef.current.value && innInputRef.current.value.length >= 10 &&
            selectedStartDate !== "Дата начала" && selectedEndDate !== "Дата конца");
    }, [innError, quantityError, dateError, selectedStartDate, selectedEndDate]);

    const innInput = (event) => {
        const inputValue = event.target.value;
        setInnError(inputValue.length >= 10 && !validateInn(inputValue));
        successfull();
    }

    const innInputBlur = (event) => {
        if (!innError)
            setInnError(!validateInn(event.target.value));
        successfull();
    }

    const quantityInput = (event) => {
        let numbers = event.target.value;
        if (numbers > 1000 || numbers.length > 4){
            numbers = "1000";
        }
        if (numbers === "0" || numbers < 0 || numbers === "-0"){
            numbers = "1";
        }
        setQuantityError(!numbers);
        successfull();
    }

    const quantityInputBlur = () => {
        successfull();
    }

    const btnClick = async () => {
        const inn = innInputRef.current.value;
        const tonality = ton;
        const limit = quantityInputRef.current.value;

        btnRequestRef.current.disabled = true;

        dispatch(setHistogramDate(undefined));
        dispatch(setPublicationsList(undefined));

        navigate("/results");

        try {
            const [histogramResponse, publicationsResponse] = await Promise.all([
                RequestToApi.getHistograms(inn, tonality, limit, selectedStartDate, selectedEndDate),
                RequestToApi.getPublicationsList(inn, tonality, limit, selectedStartDate, selectedEndDate)
            ]);

            dispatch(setHistogram(histogramResponse));
            dispatch(setPublicationsList(publicationsResponse.data.items));
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const successfull = () => {
        const innValue = innInputRef.current.value;

        setCompleted(!innError && !quantityError && !dateError &&
            quantityInputRef.current.value &&
            innValue && innValue.length >= 10 &&
            selectedStartDate !== "Дата начала" && selectedEndDate !== "Дата конца");
    }

    return (
        <section className={styles.requestWindow__container}>
            <form className={styles.container__form}>
                {/* Form Inputs */}
                <DateRangeInputs
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    setSelectedStartDate={setSelectedStartDate}
                    setSelectedEndDate={setSelectedEndDate}
                    isError={dateError}
                    setError={setDateError}
                />

                {/* Form Elements */}
                <input
                    ref={innInputRef}
                    type="number"
                    name="inn"
                    id="inn"
                    min="10"
                    max="10"
                    onBlur={innInputBlur}
                    onChange={innInput}
                    placeholder="10 цифр"
                    required
                    className={!innError ? styles.inn__input_ok : styles.input_error}
                />
                {innError && <p className={styles.p_error}>Введите корректные данные</p>}

                <select
                    value={ton}
                    onChange={(event) => setTon(event.target.value)}
                    className={styles.tonality__select}
                >
                    {tonalityOptions.map((option) => (
                        <option className={styles.select__option} key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <input
                    ref={quantityInputRef}
                    type="number"
                    name="quantity"
                    id="quantity"
                    min="1"
                    max="10000"
                    onBlur={quantityInputBlur}
                    onChange={quantityInput}
                    placeholder="от 1 до 1000"
                    required
                    className={!quantityError ? styles.quantity__input_ok : styles.input_error}
                />
                {quantityError && <p className={styles.p_error}>Введите корректные данные</p>}

                <button
                    ref={btnRequestRef}
                    className={styles.secondBlock__btn}
                    onClick={btnClick}
                    disabled={!completed}
                >
                    Поиск
                </button>

                {/* Info Text */}
                <p className={styles.leftBox__txt}>* Обязательные к заполнению поля</p>
            </form>
        </section>
    );
}
