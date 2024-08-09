import React, { useState } from "react";
import Button from "./button";
import { FaHome, FaTimes } from "react-icons/fa";
import SearchInput from "./SearchInput";
import { SelectDropdown } from "./SelectDropDown/SelectDropDown";
import { language } from "../Utils/data";
import { FaBars } from "react-icons/fa6";
import { useLocation } from "react-router-dom";


function Navbar() {
    const {pathname} = useLocation();
   
  const [selectedOption, setSelectedOption] = useState(null);
  const [navMenu, setNavMenu] = useState(false);
  const clicked = () => {
    alert("welcome to wikimedia ");
  };
  const handleChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className=" w-full h-fit bg-slate-200 flex justify-between items-center px-12 pt-6 pb-3  ">
      <div className="text-2xl text-black flex w-30 items-center ">
        <div className="bg-white p-4  hover:text-wikimedia-wikiblue">
          <a
            href="/"
            className={` ${pathname === "/" && "text-wikimedia-wikiblue"}`}
          >
            <FaHome />
          </a>
        </div>
        <a href="about">
          <p
            className={`pl-10 font-thin ${
              pathname === "/about" && "text-wikimedia-wikiblue"
            } hover:text-wikimedia-wikiblue `}
          >
            About
          </p>
        </a>
      </div>
      <div className="flex ">
        <div className="items-center gap-8  hidden lg:flex">
          <div>
            <SelectDropdown
              options={language}
              handleChange={handleChange}
              defaultValue={language[0]}
              clearable={false}
            />
          </div>
          <SearchInput onSearch={""} />
          <div className="animate-pucolourOptionslse pl-6">
            <Button label="Login" onClick={clicked} />
          </div>
        </div>
        {!navMenu && (
          <FaBars
            size={24}
            className="flex lg:hidden"
            onClick={() => setNavMenu(!navMenu)}
          />
        )}
        {navMenu && (
          <div className="lg:hidden fixed inset-0  ">
            <div className="items-center absolute right-0  px-8  pt-10 h-[100vh] lg:hidden shadow-customShadow bg-slate-50">
              <FaTimes
                size={24}
                className="float-end mr-4"
                onClick={() => setNavMenu(!navMenu)}
              />
              <div className="pt-20 pb-10">
                <SelectDropdown
                  options={language}
                  handleChange={handleChange}
                  defaultValue={language[0]}
                  clearable={false}
                />
              </div>
              <SearchInput onSearch={""} />
              <div className="animate-pucolourOptionslse py-10 w-full">
                <Button label="Login" onClick={clicked} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
