import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  basket: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
  totalDiscountPrice: 0,
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
        exist.totalPrice += Number(exist.price * exist.amount);
        exist.totalDiscountPrice += Number(exist.disCountPrice * exist.amount);
        state.totalPrice += Number(exist.price);
        state.totalDiscountPrice += Number(exist.disCountPrice);
        state.totalAmount++;
      } else {
        state.basket.push(action.payload);
        state.totalAmount++;
        state.totalPrice += action.payload.price;
        state.totalDiscountPrice += action.payload.disCountPrice;
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
        state.totalDiscountPrice -= exist.totalDiscountPrice;
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
        exist.totalDiscountPrice += exist.disCountPrice;
        state.totalAmount++;
        state.totalPrice += exist.price;
        state.totalDiscountPrice += exist.disCountPrice;
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
        exist.totalDiscountPrice -= exist.disCountPrice;
        state.totalAmount--;
        state.totalPrice -= exist.price;
        state.totalDiscountPrice -= exist.disCountPrice;
      }
    },

    clearBasket: (state) => {
      state.basket = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
      state.totalDiscountPrice = 0;
    },

    setDiscountedPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increament,
  decrement,
  clearBasket,
  setDiscountedPrice,
} = basketSlice.actions;
export default basketSlice.reducer;
