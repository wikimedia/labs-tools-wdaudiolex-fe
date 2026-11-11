import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Container, Box } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#ffffff"
    }}>
      <Navbar />
      <Container 
        component="main" 
        maxWidth={false}
        sx={{ 
          flexGrow: 1, 
          py: 2,
          px: { xs: 2, sm: 3, lg: 4 },
          width: "100%",
          maxWidth: "80rem",
          mx: "auto",
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
