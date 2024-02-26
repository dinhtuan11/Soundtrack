import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import en from "./locales/en/lang.json";
import vi from "./locales/vi/lang.json";

export const locales = {
    en: "EN",
    vi: "VI"
}

const resources = {
    en: { translation: en },
    vi: { translation: vi },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
    resources,
    fallbackLng: "vi",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;