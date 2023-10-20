import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { increamentBalans } from "../features/slices/walletSlice";
import { setDiscountedPrice } from "../features/slices/basketSlice";

const Checkout = () => {
  const [amounth, setAmounth] = useState(0);
  const walletAmounth = useSelector(
    (state) => state.persistedReducer.wallet.balans
  );
  const totalPrice = useSelector(
    (state) => state.persistedReducer.basket.totalPrice
  );
  const totalDiscountPrice = useSelector(
    (state) => state.persistedReducer.basket.totalDiscountPrice
  );
  const resultTotal = Number(totalPrice - totalDiscountPrice).toFixed(2);
  const dispatch = useDispatch();

  const addAmounth = () => {
    dispatch(increamentBalans(Number(amounth)));
    setAmounth(0);
  };

  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const applyDiscount = () => {
    if (!discountApplied && discountCode === "gs1905") {
      const discountedTotal = (resultTotal - resultTotal * 0.2).toFixed(2);
      dispatch(setDiscountedPrice(discountedTotal));
      setDiscountApplied(true);
      toast.success("Discount applied successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else {
      toast.error("Invalid discount code", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <Layout>
      <>
        <div className="h-[100vh]  dark:bg-black p-20 flex flex-col justify-start items-center font-primary">
          <h1 className="text-5xl dark:text-cyan-300 mb-4 font-semibold ">
            Payment
          </h1>

          <div className=" bg-gray-300 dark:bg-primary w-[300px] mb-10 flex flex-col justify-center items-center rounded-md">
            <div className=" dark:text-white p-2 text-2xl ">
              Balance: ${Number(walletAmounth.toFixed(2))}
            </div>
            <div className=" dark:text-white p-2 text-2xl">
              TotalPrice: $ {parseFloat(resultTotal).toFixed(2)}
            </div>
            <div className="w-[150px] my-3">
              <Modal />
            </div>
          </div>

          <div className=" bg-gray-300 dark:bg-primary w-[300px] mb-10 flex flex-col justify-center items-center rounded-md">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="bg-slate-100 p-2  rounded-md my-3"
              />
            </div>
            <button
              className="w-[208px] mb-3  bg-violet-600 py-2  text-center rounded-md text-white font-bold"
              onClick={applyDiscount}
              disabled={discountApplied}
            >
              Get Discount
            </button>
          </div>

          <div className=" bg-gray-300 dark:bg-primary w-[300px]  flex flex-col justify-center items-center rounded-md">
            <input
              type="number"
              placeholder="Balance"
              className=" bg-slate-100 p-2  rounded-md my-3"
              value={amounth}
              onChange={(e) => setAmounth(e.target.value)}
            />
            <button
              className="w-[208px] mb-3  bg-violet-600 py-2  text-center rounded-md text-white font-bold"
              onClick={addAmounth}
            >
              Add Amounth
            </button>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Checkout;
