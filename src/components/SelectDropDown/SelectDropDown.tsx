import React, { FC, useState } from "react";

import Select from "react-select";
import { colourOptions } from "../../Utils/data";


type SelectDropdownProps = {
  placeholder?: string;
  options: any[];
  defaultValue?: any;
  handleChange: (data: any) => void;
  clearable?: boolean;
};
export const SelectDropdown: FC<SelectDropdownProps> = ({
  placeholder,
  options,
  handleChange,
  defaultValue,
  clearable
}) => {
  const [isSearchable, setIsSearchable] = useState(true);

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select py-[4] "
        defaultValue={defaultValue}
        isClearable={clearable}
        isSearchable={isSearchable}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
      />
    </>
  );
};
