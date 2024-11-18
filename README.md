# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:



- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Material UI Setup for Wiki-Hackkmer Frontend

This document explains how to set up Material UI in the Wiki-Hackkmer project.

## Installation Steps

1. **Install Material UI Core Packages**
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
Install Material UI Icons


npm install @mui/icons-material
Install Roboto Font


npm install @fontsource/roboto
Import Roboto Font Add the following imports to src/main.jsx:


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
Optional: Use Google Fonts Add the following code inside the <head> tag of public/index.html:


<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>
Create a Component with Material UI Example of a button component (src/components/Button.jsx):


import React from 'react';
import Button from '@mui/material/Button';

const ExampleButton = () => (
  <Button variant="contained" color="primary">
    Click Me
  </Button>
);

Test the Project Run the project and visit http://localhost:5173 to see Material UI in action.

npm run dev