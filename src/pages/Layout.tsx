import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Container, Box } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#ffffff'
    }}>
      <Navbar />
      <Container 
        component="main" 
        maxWidth="lg" 
        sx={{ 
          flexGrow: 1, 
          py: 3,
          px: { xs: 2, sm: 3 }
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
