import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Navbar: React.FC = () => {
  // Wikimedia color palette
  const wikiBlue = "#3366cc";
  const wikiGray = "#f8f9fa";
  
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: wikiGray,
        color: "#202122",
        boxShadow: "none",
        borderBottom: "1px solid #eaecf0",
        mb: 2
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "80rem",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
          <Box
            component="img"
            src="/logo.jpg"
            alt="WDAudioLex"
            sx={{ width: 48, height: 48, borderRadius: 1, display: "block" }}
          />
          <Typography
            component="span"
            aria-hidden
            sx={{ color: "#a2a9b1", px: 1, lineHeight: 1, fontWeight: 300 }}
          >
            |
          </Typography>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontFamily: "\"Libertinus Serif\", \"Linux Libertine\", \"Georgia\", \"Times\", serif",
              fontWeight: "normal",
              flexGrow: 1 
            }}
          >
            Audio Lexeme Matching
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            startIcon={<HomeIcon />}
            sx={{ 
              color: "#202122",
              "&:hover": {
                backgroundColor: "rgba(51, 102, 204, 0.1)"
              }
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/contributions"
            startIcon={<PersonIcon />}
            sx={{ 
              color: "#202122",
              "&:hover": {
                backgroundColor: "rgba(51, 102, 204, 0.1)"
              }
            }}
          >
            My Contributions
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/help"
            startIcon={<HelpOutlineIcon />}
            sx={{ 
              color: "#202122",
              "&:hover": {
                backgroundColor: "rgba(51, 102, 204, 0.1)"
              }
            }}
          >
            Help
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              ml: 1,
              backgroundColor: wikiBlue,
              "&:hover": {
                backgroundColor: "#2a4b8d"
              }
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 