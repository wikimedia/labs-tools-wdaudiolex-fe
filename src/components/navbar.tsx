import React from "react";
import Button from "./button";
import { FaHome } from "react-icons/fa";
import SearchInput from "./SearchInput";
import DropdownMenu from "./dropdown";
import { language } from "../Utils/data";

function Navbar() {
  const clicked = () => {
    alert("welcome to wikimedia ");
  };
  return (
    <div className=" w-full h-fit bg-slate-200 flex justify-between items-center px-12">
      <div className="text-2xl text-black flex w-30  ">
        <div className="bg-white h-fit p-4 mt-4  hover:text-wikimedia-wikiblue">
          <a href="#">
            <FaHome />
          </a>
        </div>
        <a href="#">
          <p className="pl-10 pt-7 font-thin hover:text-wikimedia-wikiblue">
            About
          </p>
        </a>
    </div>

      <div className="mt-5">
        <div className="mt-5 pb-3 flex gap-10 ">
          <DropdownMenu options={language} placeholder="Translate" />
          <SearchInput onSearch={""} />
          <div className="animate-pulse">
            <Button label="Login" onClick={clicked} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
