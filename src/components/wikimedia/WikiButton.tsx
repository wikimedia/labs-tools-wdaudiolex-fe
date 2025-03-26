import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface WikiButtonProps extends Omit<ButtonProps, 'color' | 'action'> {
  /**
   * The button action type
   */
  actionType?: 'progressive' | 'destructive' | 'default';
  /**
   * The button weight
   */
  weight?: 'normal' | 'primary';
  /**
   * Component type for rendering the button as different elements
   */
  component?: React.ElementType;
  /**
   * URL for link buttons
   */
  href?: string;
  /**
   * Target for link buttons
   */
  target?: string;
  /**
   * Rel attribute for link buttons
   */
  rel?: string;
}

/**
 * WikiButton is a component that displays buttons in the Wikimedia style
 * using Material UI Button component underneath.
 */
const WikiButton: React.FC<WikiButtonProps> = ({ 
  actionType = 'default',
  weight = 'normal',
  children,
  component,
  href,
  target,
  rel,
  ...props
}) => {
  // Map action and weight combinations to colors and styles
  const getStyles = () => {
    const baseStyles = {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '0.875rem',
      fontWeight: weight === 'primary' ? 'bold' : 'normal',
      textTransform: 'none' as const,
      borderRadius: '2px',
      padding: '8px 12px',
    };

    if (weight === 'primary') {
      // Filled button styles
      switch (actionType) {
        case 'progressive':
          return {
            ...baseStyles,
            backgroundColor: '#3366cc',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#2a4b8d'
            }
          };
        case 'destructive':
          return {
            ...baseStyles,
            backgroundColor: '#d33',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#b32424'
            }
          };
        default:
          return {
            ...baseStyles,
            backgroundColor: '#f8f9fa',
            color: '#202122',
            border: '1px solid #a2a9b1',
            '&:hover': {
              backgroundColor: '#eaecf0',
              borderColor: '#72777d'
            }
          };
      }
    } else {
      // Outlined button styles
      switch (actionType) {
        case 'progressive':
          return {
            ...baseStyles,
            color: '#3366cc',
            border: '1px solid #3366cc',
            '&:hover': {
              backgroundColor: 'rgba(51, 102, 204, 0.1)'
            }
          };
        case 'destructive':
          return {
            ...baseStyles,
            color: '#d33',
            border: '1px solid #d33',
            '&:hover': {
              backgroundColor: 'rgba(211, 51, 51, 0.1)'
            }
          };
        default:
          return {
            ...baseStyles,
            color: '#202122',
            border: '1px solid #a2a9b1',
            '&:hover': {
              backgroundColor: '#eaecf0',
              borderColor: '#72777d'
            }
          };
      }
    }
  };

  return (
    <Button
      variant={weight === 'primary' ? 'contained' : 'outlined'}
      {...(component ? { component } : {})}
      {...(href ? { href } : {})}
      {...(target ? { target } : {})}
      {...(rel ? { rel } : {})}
      sx={getStyles()}
      {...props}
    >
      {children}
    </Button>
  );
};

export default WikiButton; 