import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Autocomplete,
  Paper
} from "@mui/material";
import { categoriesApi } from "../../services/api";

interface Category {
  id: string;
  name: string;
  count?: number;
}

interface CategorySelectorProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    // Load initial categories when component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async (query?: string) => {
    setLoading(true);
    setError(null);
    try {
      // For now, using mock data since the API isn't fully implemented yet
      // const response = await categoriesApi.getCategories(query);
      // setCategories(response.data);

      // Mock data for development purposes
      setTimeout(() => {
        const mockCategories: Category[] = [
          { id: "pronunciation_recordings", name: "Pronunciation recordings", count: 5432 },
          { id: "audio_pronunciation_en", name: "English pronunciation audio", count: 1275 },
          { id: "audio_pronunciation_fr", name: "French pronunciation audio", count: 987 },
          { id: "audio_pronunciation_es", name: "Spanish pronunciation audio", count: 732 },
          { id: "audio_pronunciation_de", name: "German pronunciation audio", count: 645 },
        ];

        // Filter by query if provided
        const filteredCategories = query
          ? mockCategories.filter(cat =>
            cat.name.toLowerCase().includes(query.toLowerCase()))
          : mockCategories;

        setCategories(filteredCategories);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to load categories. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchCategories(query);
  };

  const handleCategoryChange = (event: any, newValue: Category | null) => {
    setSelectedCategory(newValue);
    if (newValue) {
      onCategorySelect(newValue.id);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        border: '1px solid #eaecf0',
        borderRadius: '4px',
        '& .MuiInputBase-root': {
          color: '#202122',
          borderColor: '#a2a9b1'
        }
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#000', fontFamily: '"Libertinus Serif", "Linux Libertine", "Georgia", "Times", serif' }}
      >
        Select Commons Category
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: 2, color: '#54595d' }}
      >
        Choose a category containing audio files to match with lexemes
      </Typography>

      <Autocomplete
        id="category-selector"
        options={categories}
        getOptionLabel={(option) => option.name}
        loading={loading}
        value={selectedCategory}
        onChange={handleCategoryChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search categories"
            variant="outlined"
            fullWidth
            onChange={handleSearchChange}
            value={searchQuery}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#a2a9b1',
                },
                '&:hover fieldset': {
                  borderColor: '#72777d',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3366cc',
                },
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.id}>
            {option.name}
            {option.count && <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({option.count} files)
            </Typography>}
          </MenuItem>
        )}
      />

      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{ mt: 1, color: '#d33' }}
        >
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default CategorySelector; 