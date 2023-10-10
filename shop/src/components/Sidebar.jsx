import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash } from "react-icons/fi";
import { SidebarContext } from "../contexts/SidebarContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  return (
    <>
      <div
        className={`${
          isOpen ? "right-0" : "-right-full"
        } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[25vw] 
      xl:max-w-[25vw] z-30 transition-all duration-500 px-4 lg:px-[35px]`}
      >
        <div
          className="flex justify-between items-center py-6 border-b border-red-300"
          onClick={handleClose}
        >
          <p className="uppercase text-md font-semibold">Bag(0)</p>
          <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
            <IoMdArrowForward className="text-2xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
