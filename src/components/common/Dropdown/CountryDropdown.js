import React from 'react';
import {Autocomplete, Box, TextField} from "@mui/material";
import {COUNTRIES} from "../../../constants/country";

const CountryDropdown = ({handleOptionChange, loading}) => {

    const handleCountryChange = (e, newValue) => {
        const country = newValue ? newValue.code : null;
        handleOptionChange("country", country);
    };

    return (
        <Autocomplete
            sx={{width: "100%"}}
            options={COUNTRIES}
            autoHighlight
            name="country"
            onChange={handleCountryChange}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            disabled={loading}
            renderOption={(props, option) => (
                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                    />
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="국가"
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
            )}
        />
    );
};

export default CountryDropdown;