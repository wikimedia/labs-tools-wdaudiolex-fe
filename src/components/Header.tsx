import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-wikimedia-wikiblue">
      <div className="flex items-center">
        <img src="path-to-logo.png" alt="Wikipedia logo" className="h-8 mr-2" />
        <div className="relative">
          <select className="bg-white border border-gray-300 rounded py-2 px-3">
            <option>English</option>
            {/* Other languages */}
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="search items" className="border border-gray-300 rounded py-2 px-3" />
        <button className="py-2 px-4 bg-gray-300 rounded">Login</button>
      </div>
    </header>
  );
};

export default Header;
