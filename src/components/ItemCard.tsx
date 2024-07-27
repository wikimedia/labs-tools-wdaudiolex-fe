import { PencilIcon } from "@heroicons/react/24/outline";
import React from "react";

export interface Item {
  id: string;
  label: string;
  description: string;
  imgUrl: string;
  totalFiles: string;
  foundedDate: string;
}

const ItemCard = ({
  id,
  label,
  description,
  imgUrl,
  totalFiles,
  foundedDate,
}: Item) => {
  const collapseId = `hs-collapse-${id}`;

  return (
    <div className="container m-auto px-3 mb-10">
      <div className="flex flex-col gap-4 w-full group">
        <h1 className="text-gray-900 text-[1.20rem] capitalize group-hover:bg-opacity-85 p-2.5 border-b-[1px] border-gray-400">
          {label}
        </h1>
        <p className="text-base italic max-w-xl">{description}</p>
        <div className="flex flex-col gap-3">
          {/* item image */}
          <div className="flex items-end gap-5 md:gap-8">
            <img
              className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
              src={imgUrl}
              alt={label}
            />
            <button
              type="button"
              className="flex items-center gap-2 text-sm px-5 rounded-xl text-wikimedia-wikiblue hover:text-wikimedia-darkblue border border-wikimedia-wikiblue hover:font-medium hover:opacity-85 transition-colors"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-vertically-centered-modal"
              data-hs-overlay="#hs-vertically-centered-modal"
            >
              <span>Edit</span>
              <PencilIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* see more button */}
          <button
            type="button"
            className="hs-collapse-toggle w-24 flex items-center justify-center px-2 gap-2 text-base rounded-xl text-white font-medium bg-wikimedia-wikiblue border-wikimedia-wikiblue hover:font-medium hover:opacity-85 transition-colors"
            id={`${collapseId}-toggle`}
            data-hs-collapse={`#${collapseId}`}
          >
            <span className="hs-collapse-open:hidden">See More</span>
            <span className="hs-collapse-open:block hidden">See Less</span>
          </button>
        </div>

        {/* collapse content (more item props) */}
        <div
          id={collapseId}
          className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby={`${collapseId}-toggle`}
        >
          <p>Total Files: {totalFiles}</p>
          <p>Founded Date: {foundedDate}</p>
        </div>

        {/* modal content */}
        <div
          id="hs-vertically-centered-modal"
          className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
          role="dialog"
          tabindex="-1"
          aria-labelledby="hs-vertically-centered-modal-label"
        >
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                <h3
                  id="hs-vertically-centered-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  Modal title
                </h3>
                <button
                  type="button"
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  aria-label="Close"
                  data-hs-overlay="#hs-vertically-centered-modal"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <p className="text-gray-800 dark:text-neutral-400">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-vertically-centered-modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
