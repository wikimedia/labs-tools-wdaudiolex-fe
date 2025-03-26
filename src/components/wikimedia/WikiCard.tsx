import React from 'react';
import { Paper, Box, Typography, Divider, PaperProps } from '@mui/material';

interface WikiCardProps extends Omit<PaperProps, 'elevation' | 'title'> {
  /**
   * The title of the card
   */
  title?: React.ReactNode;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Optional header actions to display next to the title
   */
  headerActions?: React.ReactNode;
}

/**
 * WikiCard is a component that displays information in a card format
 * following Wikimedia design principles.
 */
const WikiCard: React.FC<WikiCardProps> = ({
  title,
  footer,
  children,
  headerActions,
  ...props
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        border: '1px solid #c8ccd1',
        borderRadius: '2px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        ...props.sx
      }}
      {...props}
    >
      {title && (
        <>
          <Box sx={{ 
            p: 2, 
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #eaecf0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {typeof title === 'string' ? (
              <Typography 
                variant="subtitle1" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#222'
                }}
              >
                {title}
              </Typography>
            ) : (
              title
            )}
            
            {headerActions && (
              <Box>
                {headerActions}
              </Box>
            )}
          </Box>
        </>
      )}
      
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
      
      {footer && (
        <>
          <Divider />
          <Box sx={{ 
            p: 2, 
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #eaecf0'
          }}>
            {footer}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default WikiCard; 