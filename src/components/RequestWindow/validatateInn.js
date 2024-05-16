export function validateInn(inn) {
    const error = {};

    if (typeof inn !== 'string') {
        inn = String(inn);
    }

    if (!inn.length) {
        error.code = 1;
        error.message = 'ИНН пуст';
    } else if (!/^\d+$/.test(inn)) {
        error.code = 2;
        error.message = 'ИНН может состоять только из цифр';
    } else if (![10, 12].includes(inn.length)) {
        error.code = 3;
        error.message = 'ИНН может состоять только из 10 или 12 цифр';
    } else {
        const checkDigit = (coefficients) => {
            let n = 0;
            for (let i = 0; i < coefficients.length; i++) {
                n += coefficients[i] * parseInt(inn[i]);
            }
            return parseInt(n % 11 % 10);
        };

        switch (inn.length) {
            case 10:
                const n10 = checkDigit([2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n10 === parseInt(inn[9])) {
                    return true;
                }
                break;
            case 12:
                const n11 = checkDigit([7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                const n12 = checkDigit([3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
                    return true;
                }
                break;
            default:
                break;
        }

        error.code = 4;
        error.message = 'Неправильное контрольное число';
    }

    return { result: false, error };
}

