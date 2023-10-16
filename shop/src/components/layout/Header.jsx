import React, { useContext, useEffect, useState, Fragment } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsFillCloudSunFill, BsWallet } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { handleThemeSwitch, theme } = useContext(ThemeContext);
  const totalAmount = useSelector(
    (state) => state.persistedReducer.basket.totalAmount
  );
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const logoutUser = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as={Fragment}
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              as={Fragment}
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-black pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 text-3xl inline-flex items-center justify-center rounded-md p-2 text-gega-red"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gega-red px-4 py-6 flex items-center justify-center flex-col ">
                  <div>
                    <Link
                      to={"/signup"}
                      className="font-medium text-primary text-2xl cursor-pointer ml-2 dark:text-white"
                    >
                      Signup
                    </Link>
                  </div>
                  <div>
                    {user && (
                      <a
                        className="font-medium text-primary text-2xl cursor-pointer ml-2 dark:text-white"
                        onClick={logoutUser}
                      >
                        LogOut
                      </a>
                    )}
                  </div>

                  <div>
                    {user?.email === "khuseyn693@gmail.com" && (
                      <Link
                        to={"/addproduct"}
                        className="font-medium text-primary text-2xl cursor-pointer ml-2 dark:text-white"
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header
        aria-label="Top"
        className={`${
          isActive
            ? "bg-indigo-100 dark:bg-gray-500/75 "
            : "bg-white dark:bg-black  shadow-md dark:shadow-cyan-300"
        } sticky top-0 w-full z-50 transition-all ` }
      >
        <div className="container mx-auto flex items-center justify-between h-full
          font-primary text-4xl p-3 text-primary dark:text-cyan-400">
          <Link to={"/"}>
            Corat Store
          </Link>

          <button
            type="button"
            className="text-3xl mt-1 text-gray-500 lg:hidden dark:text-white"
            onClick={() => setOpen(true)}
          >
            <GiHamburgerMenu />
          </button>

          <div className="flex items-center justify-center">
            {user && (
              <a
                className="text-xl font-medium text-primary dark:text-gray-100 mx-2 hidden md:block"
                onClick={logoutUser}
              >
                LogOut
              </a>
            )}

            {user?.email === "khuseyn693@gmail.com" && (
              <Link
                to={"/dashboard"}
                className="text-xl font-medium text-primary dark:text-gray-100 mx-2 hidden md:block"
              >
                Admin
              </Link>
            )}

            <Link
              to={"/signup"}
              className="mx-2  text-xl font-medium text-primary dark:text-gray-100 cursor-pointer ml-2 hidden md:block"
            >
              Signup
            </Link>

            <button
              className="p-2 mr-3 dark:text-white"
              onClick={handleThemeSwitch}
            >
              {theme === "light" ? (
                <FiSun size={35} />
              ) : "dark" ? (
                <BsFillCloudSunFill size={35} />
              ) : (
                ""
              )}
            </button>

            <button
              className="flex relative mr-5"
              onClick={() => setIsOpen(!isOpen)}
            >
              <BsWallet className="text-4xl text-cyan-800 dark:text-white cursor-pointer" />
              <div className="bg-gega-red absolute -right-6 bottom-6 text-[12px] w-6 h-6 text-white rounded-full flex justify-center items-center">
                {totalAmount}
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
