import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from "./contexts/ProductContext.jsx";
import { SidebarContextProvider } from "./contexts/SidebarContext.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { HelmetProvider } from 'react-helmet-async';
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "./features/app/rootReducer.jsx";
import i18n from "./i18n/i18n.jsx";

const persistConfig = {
  key: "root",
  storage,
};

const helmetContext = {};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    persistedReducer,
  },
  devTools: true,
  middleware: [],
});
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeContextProvider>
        <SidebarContextProvider>
          <ProductContextProvider>
            <BrowserRouter>
            <HelmetProvider context={helmetContext}>
            <App />
            </HelmetProvider>
            </BrowserRouter>
          </ProductContextProvider>
        </SidebarContextProvider>
      </ThemeContextProvider>
    </PersistGate>
  </Provider>
);
