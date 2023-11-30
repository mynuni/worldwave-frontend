import React from 'react';
import {Container, ErrorMessage, InputField, InputWrap, Label} from "./Input.styles";

const InputBackup = ({
                   type,
                   label,
                   onBlur,
                   autoFocus,
                   error,
                   errorMessage,
                   disabled,
                   ...rest
               }) => {
    return (
        <Container>
            <InputWrap>
                <InputField type={type}
                            onBlur={onBlur}
                            error={error}
                            placeholder=""
                            autoFocus={autoFocus}
                            disabled={disabled}
                            {...rest}/>
                <Label>{label}</Label>
            </InputWrap>
            <ErrorMessage>{errorMessage}</ErrorMessage>
        </Container>

    );
};

export default InputBackup;