import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "./language/en.json";
import azJson from "./language/az.json";

const resources = {
  en: {
    translation: enJson,
  },
  az: {
    translation: azJson,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
