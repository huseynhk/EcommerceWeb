import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BsBag } from "react-icons/bs";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import Logo from "../../img/eco.webp";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { handleThemeSwitch } = useContext(ThemeContext);
  const totalAmount = useSelector(
    (state) => state.persistedReducer.basket.totalAmount
  );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return (
    <>
      <header
        className={`${
          isActive ? "bg-indigo-100 dark:bg-indigo/75 " : "bg-white dark:bg-gray-500/75  shadow-lg"
        } sticky top-0 w-full z-10 transition-all `}
      >
        <div className="container mx-auto flex items-center justify-between h-full p-2 ">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="h-14 w-14 rounded-full" />
          </Link>
          
          <button className="p-2 bg-slate-500 rounded-lg" onClick={handleThemeSwitch}>Mode</button>
       
          <button className="flex relative" onClick={() => setIsOpen(!isOpen)}>
            <BsBag className="text-4xl text-indigo-700 cursor-pointer" />
            <div className="bg-red-500 absolute -right-5 bottom-5 text-[12px] w-5 h-5 text-white rounded-full flex justify-center items-center">
              {totalAmount}
            </div>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
