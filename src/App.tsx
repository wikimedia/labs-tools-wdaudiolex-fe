import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "./pages/HomePage";
import ContributionsPage from "./pages/ContributionsPage";
import HelpPage from "./pages/HelpPage";
import Layout from "./pages/Layout";
import { WikiThemeProvider } from "./components/wikimedia";

const App = () => {
  return (
    <WikiThemeProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="contributions" element={<ContributionsPage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
        </Routes>
      </Box>
    </WikiThemeProvider>
  );
};

export default App;
