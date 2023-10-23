import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementAmounth } from "../features/slices/walletSlice";
import { clearBasket } from "../features/slices/basketSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";

export default function Modal() {
  console.log(localStorage.getItem("user"));
  const myBalance = useSelector(
    (state) => state.persistedReducer.wallet.balans
  );
  const basket = useSelector((state) => state.persistedReducer.basket.basket);
  const totalPrice = useSelector(
    (state) => state.persistedReducer.basket.totalPrice
  );
  const totalDiscountPrice = useSelector(
    (state) => state.persistedReducer.basket.totalDiscountPrice
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePayment = async () => {
    try {
      if (myBalance >= totalPrice) {
        const data = {
          order_items: basket,
          total_price: Number(totalPrice),
          discount_price: Number(totalDiscountPrice),
          user_email: JSON.parse(localStorage.getItem("user"))?.email,
        };
        const request = await axios.post("http://localhost:3000/orders", data);

        if (request.status === 201) {
          toast.success("Ordered is successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          dispatch(decrementAmounth(totalPrice));
          dispatch(clearBasket());
          closeModal();
        } else {
          throw new Error("Error");
        }
      } else {
        throw new Error("Balance is not enough");
      }
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  //Modal
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="  text-center rounded-lg text-white font-bold">
        <button
          type="button"
          onClick={openModal}
          className="w-full  bg-violet-600 py-2  text-center rounded-md text-white font-bold "
        >
          {t("buy")}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2  text-left align-middle shadow-xl transition-all bg-gray-50">
                  <section className="">
                    <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0">
                      <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <button
                            onClick={handlePayment}
                            type="button"
                            className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 "
                          >
                            {t("ordernow")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
