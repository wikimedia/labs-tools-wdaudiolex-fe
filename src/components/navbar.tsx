import React, { useState } from "react";
import Button from "./button";
import { FaHome } from "react-icons/fa";
import SearchInput from "./SearchInput";
import { SelectDropdown } from "./SelectDropDown/SelectDropDown";
import { language } from "../Utils/data";

function Navbar() {
  const [selectedOption, setSelectedOption] = useState(null);

  const clicked = () => {
    alert("welcome to wikimedia ");
  };
  const handleChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className=" w-full h-fit bg-slate-200 flex justify-between items-center px-12">
      <div className="text-2xl text-black flex w-30  ">
        <div className="bg-white h-fit p-4 mt-4  hover:text-wikimedia-wikiblue">
          <a href="/">
            <FaHome />
          </a>
        </div>
        <a href="about">
          <p className="pl-10 pt-7 font-thin hover:text-wikimedia-wikiblue">
            About
          </p>
        </a>
      </div>

      <div className="mt-5">
        <div className="mt-5 pb-3 flex gap-10 ">
          <div>
            <SelectDropdown
              options={language}
              handleChange={handleChange}
              defaultValue={language[0]}
              clearable={false}
            />
          </div>
          <SearchInput onSearch={""} />
          <div className="animate-pucolourOptionslse">
            <Button label="Login" onClick={clicked} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
