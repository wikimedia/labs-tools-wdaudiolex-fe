import React from "react";
import { Pagination as MuiPagination, PaginationItem, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  page?: number;
}

// Styled components to match MediaWiki styles
const StyledPagination = styled(MuiPagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: theme.palette.text.primary,
    "&.Mui-selected": {
      backgroundColor: "#3366cc", // MediaWiki blue
      color: "white",
      "&:hover": {
        backgroundColor: "#2a4b8d", // Darker blue on hover
      },
    },
    "&:hover": {
      backgroundColor: "rgba(51, 102, 204, 0.1)", // Light blue background on hover
    },
  },
}));

const Pagination: React.FC<PaginationProps> = ({ 
  pageCount, 
  onPageChange,
  page = 1
}) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange({ selected: value - 1 });
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center",
        my: 4
      }}
    >
      <StyledPagination
        count={pageCount}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="medium"
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{ 
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: "0.875rem"
            }}
          />
        )}
      />
    </Box>
  );
};

export default Pagination;