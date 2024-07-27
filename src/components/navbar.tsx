import React from "react";
import Button from "./button";
import { FaHome } from "react-icons/fa";
import SearchInput from "./SearchInput";

function Navbar() {
  const clicked = () => {
    alert("welcome to wikimedia ");
  };
  return (
    <div className=" w-full bg-slate-200 flex justify-between items-center px-12">
      <div className="text-2xl text-black flex w-30  ">
        <div className="bg-white h-fit p-4 mt-4 ">
          <FaHome />{" "}
        </div>
        <p className="pl-10 pt-7 font-thin">About</p>
      </div>

      <div className="mt-5">
        <div className="mt-5 flex gap-10">
          <SearchInput onSearch={''} />
          <Button label="Login" onClick={clicked} />
        </div>
      </div>
    </div>
  );
}
export default Navbar;
