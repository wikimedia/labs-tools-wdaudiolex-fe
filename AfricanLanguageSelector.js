// src/AfricanLanguageSelector.js
import React, { useState } from "react";
import Select from "react-select";
import { africanLanguages } from "./data";

const AfricanLanguageSelector = () => {
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handleChange = (selectedOptions) => {
        setSelectedLanguages(selectedOptions || []);
    };

    return (
        <div style={{ width: "400px", margin: "0 auto" }}>
            <h3>Select African Languages</h3>
            <Select
                options={africanLanguages}
                isMulti
                onChange={handleChange}
                placeholder="Choose languages..."
                getOptionLabel={(e) => (
                    <div>
                        <strong>{e.label}</strong> <small style={{ color: "#aaa" }}>({e.region})</small>
                    </div>
                )}
            />
            <div style={{ marginTop: "20px" }}>
                <strong>Selected Languages:</strong>
                <ul>
                    {selectedLanguages.map((lang) => (
                        <li key={lang.value}>{lang.label} - {lang.region}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AfricanLanguageSelector;
