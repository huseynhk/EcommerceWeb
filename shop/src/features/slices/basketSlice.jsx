import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  basket: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (exist) {
        exist.amount++;
        exist.totalAmount++;
        exist.totalPrice += exist.price;
        // state.totalAmount++
        // state.totalPrice+= action.payload.price
      } else {
        state.basket.push(action.payload);
        state.totalAmount++;
        state.totalPrice += action.payload.price;
      }
    },

    removeFromCart: (state, action) => {
      const exist = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (exist) {
        state.basket = state.basket.filter(
          (product) => product.id !== action.payload.id
        );
        state.totalAmount -= exist.amount;
        state.totalPrice -= exist.totalPrice;
      }
    },

    increament: (state, action) => {
      const exist = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (exist) {
        exist.amount++;
        exist.totalAmount++;
        exist.totalPrice += exist.price;
        state.totalAmount++;
        state.totalPrice += exist.price;
      }
    },

    decrement: (state, action) => {
      const exist = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (exist && exist.amount > 1) {
        exist.amount--;
        exist.totalAmount--;
        exist.totalPrice -= exist.price;
        state.totalAmount--;
        state.totalPrice -= exist.price;
      }
    },

    clearBasket: (state) => {
      state.basket = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, increament, decrement, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
