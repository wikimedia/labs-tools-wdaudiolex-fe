import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";

import type { Language } from "../../services/types";

const filterLanguages = createFilterOptions<Language>({
  limit: 40,
  stringify: (language) => language.label,
});

interface LanguageSelectProps {
  languages: Language[];
  value: Language | null;
  loading: boolean;
  disabled?: boolean;
  onChange: (language: Language | null) => void;
}

export function languageKey(language: Language): string {
  return language.qid || language.iso3 || language.iso || language.label;
}

export function languageCode(language: Language): string {
  return language.iso3 || language.iso || language.qid || "";
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  languages,
  value,
  loading,
  disabled = false,
  onChange,
}) => {
  return (
    <Autocomplete
      options={languages}
      value={value}
      loading={loading}
      autoHighlight
      disabled={disabled || loading}
      onChange={(_event, next) => onChange(next)}
      filterOptions={filterLanguages}
      getOptionLabel={(language) => language.label}
      isOptionEqualToValue={(option, selected) => languageKey(option) === languageKey(selected)}
      renderOption={(props, language) => {
        const { key, ...other } = props;
        const codes = [language.iso, language.iso3, language.qid].filter((code): code is string => Boolean(code));
        return (
          <li key={key} {...other}>
            <Box sx={{ display: "flex", flexDirection: "column", py: 0.5 }}>
              <Typography variant="body1">{language.label}</Typography>
              {codes.length > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {codes.join(" · ")}
                </Typography>
              )}
            </Box>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          id={params.id}
          disabled={params.disabled}
          fullWidth={params.fullWidth}
          label="Language"
          placeholder="Select a language"
          inputProps={params.inputProps}
          InputLabelProps={{
            id: `${params.id}-label`,
            htmlFor: params.id,
          }}
          InputProps={{
            ref: params.InputProps.ref,
            className: params.InputProps.className,
            startAdornment: params.InputProps.startAdornment,
            onMouseDown: params.InputProps.onMouseDown,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          {...(params.size ? { size: params.size } : {})}
        />
      )}
    />
  );
};

export default LanguageSelect;
