
import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export interface Item {
  label: string;
  description: string;
  imgUrl: string;
  totalFiles: string;
  foundedDate: string;
}

const ItemCard = ({
  label,
  description,
  imgUrl,
  totalFiles,
  foundedDate,
}: Item) => {
  const [showAdditional, setShowAdditional] = useState(false);

  return (
    <div className="container m-auto px-3">
      <div className="flex flex-col gap-4 w-full md:max-w-3xl group">
        <h1 className="text-gray-800 text-lg capitalize bg-opacity-80 group-hover:bg-opacity-85 p-2.5 border-b-[1px] border-gray-400">
          {label}
        </h1>
        <p className="text-base">{description}</p>
        <div className="flex items-end gap-6 md:gap-8">
          <img
            className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
            src={imgUrl}
            alt={label}
          />
          <button
            onClick={() => setShowAdditional(!showAdditional)}
            className="flex items-center gap-2 px-5 py-1 rounded-xl text-wikimedia-wikiblue border border-wikimedia-wikiblue hover:font-medium hover:opacity-85 transition-colors"
          >
            edit
            <PencilIcon className="w-5 h-5" />
          </button>
        </div>
        {showAdditional && (
          <div>
            <p>Total Files: {totalFiles}</p>
            <p>Founded Date: {foundedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;

// import { PencilIcon } from "@heroicons/react/24/outline";
// import React from "react";

// export interface Item {
//   label: string;
//   description: string;
//   imgUrl: string;
// }

// interface Props {
//   items: Item[];
// }

// const ItemCard = ({ label, description, imgUrl }: Item) => {
//   return (
//     <div className="container m-auto px-3">
//       <div className="flex flex-col gap-4 w-full md:max-w-3xl group">
//         <h1 className="text-gray-800 text-lg capitalize bg-opacity-80 group-hover:bg-opacity-85 p-2.5 border-b-[1px] border-gray-400">
//           {label}
//         </h1>
//         <p className="text-base">{description}</p>
//         <div className="flex items-end gap-6 md:gap-8">
//           <img
//             className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
//             src={imgUrl}
//             alt={label}
//           />
//           <button className="flex items-center gap-2 px-5 py-1 rounded-xl text-wikimedia-wikiblue border border-wikimedia-wikiblue hover:font-medium hover:opacity-85 transition-colors">
//             edit
//             <PencilIcon className="w-5 h-5" />
//           </button>
//         </div>
//         <button
//           type="button"
//           className="hs-collapse-toggle"
//           id="hs-unstyled-collapse"
//           aria-expanded="false"
//           aria-controls="#hs-unstyled-collapse-heading"
//           data-hs-collapse="#hs-unstyled-collapse-heading"
//         >
//           Collapse
//         </button>
//         <div
//           id="hs-unstyled-collapse-heading"
//           className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
//           aria-labelledby="hs-unstyled-collapse"
//         >
//           This is a collapse body. It is hidden by default, until the collapse
//           plugin adds the appropriate classes that we use to style each element.
//           These classes control the overall appearance, as well as the showing
//           and hiding via CSS transitions.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemCard;



