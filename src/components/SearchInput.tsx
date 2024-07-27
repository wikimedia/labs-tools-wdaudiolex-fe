import React, { useState } from 'react'


function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  )
}

export default SearchInput
