import React, { FC } from "react";
import Button from "../button";
import { SelectDropdown } from "../SelectDropDown/SelectDropDown";
import { properties, values } from "../../Utils/data";
import "./EditModal.css";
import { ValueStore } from "../../../Zustand/ValueStore";
import { PropertyStore } from "../../../Zustand/PropertyStore";

type EditModalProps = {
  handleClose: () => void;
  handleEdit: () => void;
};

const EditModal: FC<EditModalProps> = ({ handleClose, handleEdit }) => {
  const { getSelectedValue } = ValueStore();
  const { getSelectedProperty } = PropertyStore();

  return (
    <div>
      <div>
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="font-bold text-gray-800 border-b-2 py-2">
              Edit Item
            </h3>

            <div className=" py-8 flex flex-col gap-6  ">
              <SelectDropdown
                options={properties}
                handleChange={(option) => getSelectedProperty(option.value)}
                placeholder="Select Property"
                clearable={false}
              />
              <SelectDropdown
                options={values}
                handleChange={(option) => getSelectedValue(option.value)}
                placeholder="Select value"
                clearable={false}
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 py-4 px-4 border-t-2">
              <Button label="Cancel" border onClick={handleClose} />
              <Button label="Save" onClick={handleEdit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
