import { combineReducers } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice"
import walletReducer from "../slices/walletSlice"

const rootReducer = combineReducers({
    basket: basketReducer,
    wallet: walletReducer,
  })
  
  export default rootReducer
