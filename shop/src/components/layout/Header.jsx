import React, { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  return (
    <>
      <header className="bg-indigo-200 py-4">
        <div>header</div>
        <button className="flex relative" onClick={() => setIsOpen(!isOpen)}>
          <BsBag className="text-2xl text-red-500 cursor-pointer" />
        </button>
      </header>
    </>
  );
};

export default Header;
