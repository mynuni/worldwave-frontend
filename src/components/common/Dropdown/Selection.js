import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Selection = ({value, onChange, children, items, width}) => {
    return (
        <Box sx={{minWidth: {width}}}>
            < FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{children}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={children}
                    onChange={onChange}
                >
                    {items.map((item, index) => (
                        <MenuItem
                            key={index}
                            value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Selection;