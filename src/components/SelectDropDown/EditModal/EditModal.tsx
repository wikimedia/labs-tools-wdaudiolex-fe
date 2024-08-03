import React, { FC, useState } from "react";
import Button from "../../button";
import { SelectDropdown } from "../SelectDropDown";
import { language, properties, values } from "../../../Utils/data";
import "./EditModal.css";

type EditModalProps = {
  handleClose: () => void;
  handleEdit: () => void;
};
const EditModal: FC<EditModalProps> = ({ handleClose, handleEdit }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div>
      <div>
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="font-bold text-gray-800 dark:text-white border-b-2 py-2">
              Edit Item
            </h3>

            <div className=" py-8 flex flex-col gap-6  ">
              <SelectDropdown
                options={properties}
                handleChange={handleChange}
                placeholder="Select Property"
                clearable={false}
              />
              <SelectDropdown
                options={values}
                handleChange={handleChange}
                placeholder="Select value"
                clearable={false}
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t-2 dark:border-neutral-700">
              <Button label="Close" onClick={handleClose} />
              <Button label="Save" onClick={handleEdit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
