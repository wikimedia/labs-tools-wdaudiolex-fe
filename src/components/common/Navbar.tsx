import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
        boxShadow: 'none',
        borderBottom: '1px solid #eaecf0',
        mb: 2
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikimedia_Foundation_logo_-_vertical.svg/75px-Wikimedia_Foundation_logo_-_vertical.svg.png"
            alt="Wikimedia"
            variant="square"
            sx={{ width: 34, height: 40, mr: 2 }}
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontFamily: '"Libertinus Serif", "Linux Libertine", "Georgia", "Times", serif',
              fontWeight: 'normal',
              flexGrow: 1 
            }}
          >
            Audio Lexeme Matching Tool
          </Typography>
        </Box>
        
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            startIcon={<HomeIcon />}
            sx={{ 
              color: '#202122',
              '&:hover': {
                backgroundColor: 'rgba(51, 102, 204, 0.1)'
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
              color: '#202122',
              '&:hover': {
                backgroundColor: 'rgba(51, 102, 204, 0.1)'
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
              color: '#202122',
              '&:hover': {
                backgroundColor: 'rgba(51, 102, 204, 0.1)'
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
              '&:hover': {
                backgroundColor: '#2a4b8d'
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