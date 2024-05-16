import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../storage/actions";

function CheckToken({ unauthRedirect }) {
    const isAuth = useSelector(state => state.account.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const expire = localStorage.getItem("expire");

        if (expire) {
            const now = new Date();
            const expireDate = new Date(expire);
            const timeDiff = expireDate.getTime() - now.getTime();

            if (timeDiff > 0) {
                // Пользователь аутентифицирован
                dispatch(setAuth(true));
            } else {
                // Токен истек, пользователь не аутентифицирован
                dispatch(setAuth(false));
                navigate(unauthRedirect);
            }

            // Повторная проверка через 15 секунд
            const timeoutId = setTimeout(() => {
                // Повторная проверка
                const expire = localStorage.getItem("expire");

                if (expire) {
                    const now = new Date();
                    const expireDate = new Date(expire);
                    const timeDiff = expireDate.getTime() - now.getTime();

                    if (timeDiff <= 0) {
                        // Токен истек, пользователь не аутентифицирован
                        dispatch(setAuth(false));
                        navigate(unauthRedirect);
                    }
                } else {
                    // Токен отсутствует, пользователь не аутентифицирован
                    dispatch(setAuth(false));
                    navigate(unauthRedirect);
                }
            }, 15000);

            return () => clearTimeout(timeoutId);
        } else {
            // Токен отсутствует, пользователь не аутентифицирован
            dispatch(setAuth(false));
            navigate(unauthRedirect);
        }
    }, [dispatch, navigate, unauthRedirect]);

    return null; // Компонент не возвращает ничего
}

export default CheckToken;

