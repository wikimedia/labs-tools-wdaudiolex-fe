import React, { useState, FC } from "react";

export type Options = {
  key: number;
  value: string;
};

type DropdownMenuProp = {
  placeholder: string;
  options: Options[];
};

const DropdownMenu: FC<DropdownMenuProp> = ({ placeholder, options }) => {
  const [selectedOption, setSelectedOption] = useState("English");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("value", e.target.value);
  };

  return (
    <select
      value={selectedOption}
      onChange={handleOptionChange}
      className="border border-wikimedia-wikiblue w-fit rounded p-2"
    >
      {options.map((item) => (
        <option value={item.value}>{item.value}</option>
      ))}
    </select>
  );
};

export default DropdownMenu;
