// src/components/LanguageCategoryComponent.js
import React, { useState } from 'react';

// Sample African language data by regions
const languageData = [
  {
    id: 1,
    name: 'West Africa',
    languages: [
      { id: 1, name: 'Yoruba' },
      { id: 2, name: 'Igbo' },
      { id: 3, name: 'Hausa' }
    ]
  },
  {
    id: 2,
    name: 'East Africa',
    languages: [
      { id: 4, name: 'Swahili' },
      { id: 5, name: 'Amharic' },
      { id: 6, name: 'Oromo' }
    ]
  },
  {
    id: 3,
    name: 'Southern Africa',
    languages: [
      { id: 7, name: 'Zulu' },
      { id: 8, name: 'Xhosa' },
      { id: 9, name: 'Afrikaans' }
    ]
  }
];

const LanguageCategoryComponent = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [languages, setLanguages] = useState([]);

  // Handle the region selection
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setLanguages(region.languages); // Display languages in the selected region
  };

  return (
    <div>
      <h1>Explore African Languages</h1>

      {/* Display list of regions */}
      <ul>
        {languageData.map((region) => (
          <li
            key={region.id}
            onClick={() => handleRegionClick(region)}
            style={{
              cursor: 'pointer',
              fontWeight: selectedRegion?.id === region.id ? 'bold' : 'normal',
              padding: '8px 0',
            }}
          >
            {region.name}
          </li>
        ))}
      </ul>

      {/* Display languages if a region is selected */}
      {selectedRegion && (
        <div>
          <h2>Languages in {selectedRegion.name}</h2>
          <ul>
            {languages.map((language) => (
              <li key={language.id}>{language.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageCategoryComponent;
