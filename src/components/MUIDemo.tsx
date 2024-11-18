import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const MUIDemo: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Material UI Setup
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This card demonstrates that Material UI is set up and ready to use in your project.
          </Typography>
        </CardContent>
        <Box textAlign="center" pb={2}>
          <Button variant="contained" color="primary">
            Test Button
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default MUIDemo;
