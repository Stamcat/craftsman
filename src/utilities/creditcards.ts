export type CreditCard = {
    name: string;
    bins: RegExp;
    codeLength: number;
};

//**
// * Stolen from https://github.com/ContaAzul/creditcard.js, but with types added!
// * There's a lot of needless extra things because this was originally written in pure JS.
// * We will improve this over time.
// *
export const creditcards: CreditCard[] = [
    {
        name: "banescard",
        bins: /^(603182)[0-9]{10,12}/,
        codeLength: 3,
    },
    {
        name: "maxxvan",
        bins: /^(603182)[0-9]{10,12}/,
        codeLength: 3,
    },
    {
        name: "cabal",
        bins: /^(604324|604330|604337|604203|604338)[0-9]{10,12}/,
        codeLength: 3,
    },
    {
        name: "goodcard",
        bins: /^(606387|605680|605674|603574)[0-9]{10,12}/,
        codeLength: 3,
    },
    {
        name: "elo",
        bins: /^(401178|401179|431274|438935|451416|457393|457631|457632|504175|627780|636297|636368|(506699|5067[0-6]\d|50677[0-8])|(50900\d|5090[1-9]\d|509[1-9]\d{2})|65003[1-3]|(65003[5-9]|65004\d|65005[0-1])|(65040[5-9]|6504[1-3]\d)|(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|(65054[1-9]|6505[5-8]\d|65059[0-8])|(65070\d|65071[0-8])|65072[0-7]|(6509[0-9])|(65165[2-9]|6516[6-7]\d)|(65500\d|65501\d)|(65502[1-9]|6550[3-4]\d|65505[0-8]))[0-9]{10,12}/,
        codeLength: 3,
    },
    {
        name: "diners",
        bins: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        codeLength: 3,
    },
    {
        name: "discover",
        bins: /^6(?:011|5[0-9]{2}|4[4-9][0-9]{1}|(22(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5]$)[0-9]{10}$))[0-9]{12}$/,
        codeLength: 4,
    },
    {
        name: "amex",
        bins: /^3[47][0-9]{13}$/,
        codeLength: 4,
    },
    {
        name: "aura",
        bins: /^50[0-9]{14,17}$/,
        codeLength: 3,
    },
    {
        name: "mastercard",
        bins: /^(603136|603689|608619|606200|603326|605919|608783|607998|603690|604891|603600|603134|608718|603680|608710|604998)|(5[1-5][0-9]{14}|2221[0-9]{12}|222[2-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12})$/,
        codeLength: 3,
    },
    {
        name: "visa",
        bins: /^4[0-9]{12}(?:[0-9]{3})?$/,
        codeLength: 3,
    },
    {
        name: "hipercard",
        bins: /^(38[0-9]{17}|60[0-9]{14})$/,
        codeLength: 3,
    },
    {
        name: "jcb",
        bins: /^(?:2131|1800|35\d{3})\d{11}$/,
        codeLength: 3,
    },
];

const MILLENNIUM = 1000;
const DEFAULT_CODE_LENGTH = 3;
/* #__PURE__ */
export const getCreditCardNameByNumber = (number: string) => {
    return findCreditCardObjectByNumber(number).name || "invalid";
};
/* #__PURE__ */
export const isSecurityCodeValid = (creditCardNumber?: number | null, securityCode?: number | null): boolean => {
    if (!creditCardNumber || !securityCode) {
        return false;
    }
    const numberLength = getCreditCardCodeLengthByNumber(creditCardNumber.toString());
    return new RegExp(`^[0-9]{${numberLength}}$`).test(securityCode.toString());
};
/* #__PURE__ */
export const isExpirationDateValid = (month?: number | null, year?: number | null) => {
    if (!month || !year) {
        return false;
    }
    return isValidMonth(month) && isValidYear(year) && isFutureOrPresentDate(month, year);
};

type CardValidOpts = {
    cards?: string[];
};
/* #__PURE__ */
export const isValidCardNumber = (number?: number | null, options: CardValidOpts = {}) => {
    const { cards } = options;
    if (!number) {
        return false;
    }
    const rawNumber = removeNonNumbersCaracteres(number.toString());
    if (hasSomeInvalidDigit(number.toString()) || !hasCorrectLength(rawNumber)) {
        return false;
    }

    const sum = sumNumber(rawNumber);
    return checkSum(sum) && validateCardsWhenRequired(number.toString(), cards || []);
};

function validateCardsWhenRequired(number: string, cards: string[]) {
    return !cards?.length || validateCards(number, cards);
}

function validateCards(number: string, cards: string[]) {
    return (
        areCardsSupported(cards) &&
        cards.map((c) => c.toLowerCase()).includes(getCreditCardNameByNumber(number).toLowerCase())
    );
}

function hasCorrectLength(number: string) {
    return number && number.length <= 19;
}

function removeNonNumbersCaracteres(number: string) {
    return number.replace(/\D/g, "");
}

function hasSomeInvalidDigit(creditcardNumber: string) {
    const invalidDigits = new RegExp("[^0-9- ]");
    return invalidDigits.test(creditcardNumber);
}

function checkSum(sum: number) {
    return sum > 0 && sum % 10 === 0;
}

function areCardsSupported(passedCards: string[]) {
    const supportedCards = creditcards.map((c) => c.name.toLowerCase());
    return passedCards.every((c) => supportedCards.includes(c.toLowerCase()));
}

function findCreditCardObjectByNumber(number: string) {
    if (!number) {
        return {
            name: undefined,
            codeLength: undefined,
        };
    }
    const numberOnly = number.replace(/[^\d]/g, "");
    return creditcards.find((card) => card.bins.test(numberOnly)) || {};
}

function getCreditCardCodeLengthByNumber(number: string) {
    return findCreditCardObjectByNumber(number).codeLength || DEFAULT_CODE_LENGTH;
}

function isValidMonth(month: number) {
    return !isNaN(month) && month >= 1 && month <= 12;
}

function isValidYear(year: number) {
    return !isNaN(year) && isValidFullYear(formatFullYear(year));
}

function formatFullYear(year: number) {
    if (year.toString().length === 2) {
        return dateRange(year);
    }

    return year.toString().length === 4 ? year : 0;
}

function dateRange(increaseYear = 0) {
    const year = parseInt(increaseYear.toString());
    const today = new Date();
    return Math.floor(today.getFullYear() / MILLENNIUM) * MILLENNIUM + year;
}

function isValidFullYear(year: number) {
    return year >= dateRange() && year <= dateRange(MILLENNIUM);
}

function isFutureOrPresentDate(month: number, year: number) {
    const fullYear = formatFullYear(year);
    const currentDate = new Date();
    const expirationDate = new Date();

    currentDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), 1);
    expirationDate.setFullYear(fullYear, month - 1, 1);

    return currentDate <= expirationDate;
}

function sumNumber(number: string) {
    const computed = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    let sum = 0;
    let digit = 0;
    let i = number.length;
    let even = true;

    while (i--) {
        digit = Number(number[i]);
        // eslint-disable-next-line no-cond-assign -- exception here is ok
        sum += (even = !even) ? computed[digit] : digit;
    }

    return sum;
}
