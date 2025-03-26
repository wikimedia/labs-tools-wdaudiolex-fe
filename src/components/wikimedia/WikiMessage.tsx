import React from 'react';
import { Box, Paper, Typography, Alert, AlertProps } from '@mui/material';

interface WikiMessageProps {
  /**
   * The title of the message
   */
  title?: string;
  /**
   * The message type
   */
  type?: 'notice' | 'warning' | 'error' | 'success';
  /**
   * The message content
   */
  children: React.ReactNode;
}

/**
 * WikiMessage is a component that displays messages in the Wikimedia style
 * using Material UI components underneath.
 */
const WikiMessage: React.FC<WikiMessageProps> = ({ 
  title, 
  type = 'notice', 
  children 
}) => {
  // Map Wikimedia message types to Material UI alert severities
  const severityMap: Record<WikiMessageProps['type'], AlertProps['severity']> = {
    notice: 'info',
    warning: 'warning',
    error: 'error',
    success: 'success'
  };

  // Map message types to Wikimedia colors
  const colorMap = {
    notice: {
      bg: '#eaecf0',
      border: '#a2a9b1',
      icon: '#3366cc'
    },
    warning: {
      bg: '#fef6e7',
      border: '#fc3',
      icon: '#fc3'
    },
    error: {
      bg: '#fee7e6',
      border: '#d33',
      icon: '#d33'
    },
    success: {
      bg: '#d5fdf4',
      border: '#14866d',
      icon: '#14866d'
    }
  };

  const colors = colorMap[type];
  
  return (
    <Alert
      severity={severityMap[type]}
      sx={{
        backgroundColor: colors.bg,
        color: '#202122',
        border: `1px solid ${colors.border}`,
        '& .MuiAlert-icon': {
          color: colors.icon
        },
        p: 2
      }}
    >
      {title && (
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
      )}
      <Typography variant="body2" component="div">
        {children}
      </Typography>
    </Alert>
  );
};

export default WikiMessage; 