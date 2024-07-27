import React from "react";

export interface Item {
  label: string;
  description: string;
  imgUrl: string;
}

interface Props {
  items: Item[];
}

const ItemCard = ({ label, description, imgUrl }: Item) => {
  return (
    <div className="container m-auto px-3">
      <div className="flex flex-col items-center gap-4 w-full md:max-w-lg group">
        <h1 className="text-white bg-blue-600 bg-opacity-80 group-hover:bg-opacity-85 p-2.5 rounded-md">
          {label}
        </h1>
        <p className="text-base">{description}</p>
        <div className="flex items-center ">
          <img
            className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-xl group-hover:opacity-80"
            src={imgUrl}
            alt={label}
          />
          
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
