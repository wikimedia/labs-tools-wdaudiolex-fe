import React, { useState } from 'react';

const CategorySelection = ({ categories, onSelect }) => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update the selected category
    onSelect(category); // Trigger the callback
  };

  return (
    <div>
      <h3>Select a Category</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleCategoryClick(category)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: selectedCategory === category ? '#007bff' : '#f8f9fa',
              color: selectedCategory === category ? '#fff' : '#000',
              borderRadius: '50px',
              border: '1px solid #ddd',
              textAlign: 'center',
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelection;