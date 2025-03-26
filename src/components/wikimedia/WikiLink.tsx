import React from 'react';
import { Link, LinkProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface WikiLinkProps extends Omit<LinkProps, 'color'> {
  /**
   * The link type
   */
  type?: 'blue' | 'red' | 'external' | 'internal';
  /**
   * Whether the link is a react-router-dom link
   */
  to?: string;
}

/**
 * WikiLink is a component that displays links in the Wikimedia style
 * using Material UI Link component underneath.
 */
const WikiLink: React.FC<WikiLinkProps> = ({ 
  type = 'blue',
  to,
  children,
  ...props
}) => {
  // Map link types to colors and styles
  const getStyles = () => {
    const baseStyles = {
      textDecoration: 'none',
      fontWeight: 'normal',
    };

    switch (type) {
      case 'red':
        return {
          ...baseStyles,
          color: '#d33',
          '&:hover': {
            textDecoration: 'underline',
          }
        };
      case 'external':
        return {
          ...baseStyles,
          color: '#3366cc',
          '&:hover': {
            textDecoration: 'underline',
          },
          '&::after': {
            content: '"\\2197"', // External link symbol
            display: 'inline-block',
            marginLeft: '0.2em',
            fontSize: '0.8em',
          }
        };
      case 'internal':
        return {
          ...baseStyles,
          color: '#000',
          '&:hover': {
            textDecoration: 'underline',
            color: '#3366cc',
          }
        };
      default: // blue
        return {
          ...baseStyles,
          color: '#3366cc',
          '&:hover': {
            textDecoration: 'underline',
          }
        };
    }
  };

  // If 'to' prop is provided, render as RouterLink
  if (to) {
    return (
      <Link
        component={RouterLink}
        to={to}
        sx={getStyles()}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render as regular link
  return (
    <Link
      sx={getStyles()}
      {...props}
    >
      {children}
    </Link>
  );
};

export default WikiLink; 