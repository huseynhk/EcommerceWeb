import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProvider } from "./contexts/ProductContext.jsx";
import { SidebarContextProvider } from "./contexts/SidebarContext.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "./features/app/rootReducer.jsx";

const persistConfig = {
  key: "root",
  storage,
};

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
        <SidebarContextProvider>
          <ProductContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProductContextProvider>
        </SidebarContextProvider>
      </PersistGate>
    </Provider>
);
