import React from 'react';
import {TextField} from "@mui/material";
import styled from "styled-components";

const CustomInput = ({
                         type,
                         name,
                         label,
                         onClick,
                         onBlur,
                         styles,
                         readOnly,
                         error,
                         helperText,
                         disabled, ...props}) => {
    return (
        <StyledInput
            type={type}
            name={name}
            label={label}
            onClick={onClick}
            onBlur={onBlur}
            styles={styles}
            error={error}
            helperText={helperText}
            disabled={disabled}></StyledInput>
    );
};

export default CustomInput;

const StyledInput = styled(TextField)`
  width: ${props => props.styles?.width || "100%"};
  height: ${props => props.styles?.height || "100%"};

`;