import { Search } from 'lucide-react'
import React, { useState } from 'react'
import Button from './button'
import { ItemStore } from '../../Zustand/ItemStore'


function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { getSearchedItems, searchedItems, items } = ItemStore();
  
  const handleSubmit = (e: { preventDefault: () => void }) => {
   e.preventDefault()
    getSearchedItems(searchTerm);
    console.log("searched array");
    alert(searchedItems);
    
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <Button label="Search" onClick={(e)=>handleSubmit(e)} />
    </form>
  );
}

export default SearchInput
