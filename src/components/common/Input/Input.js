import React from 'react';
import styled from "styled-components";
import {TextField} from "@mui/material";

const Input = ({name, ...props}) => {
    return (
        <StyledInput {...props}
                     autoComplete="off"
                     fullWidth/>
    );
};

export default Input;

const StyledInput = styled(TextField)`
`;