import React from 'react';
import styled from "styled-components";
import COLOR from "../../../constants/color";

const Button = ({onClick, styles, isLoading, disabled, children, ...props}) => {

    return (
        <StyledButton onClick={onClick}
                      $styles={styles}
                      $isLoading={isLoading}
                      disabled={disabled}
                      {...props}>{children}
        </StyledButton>
    );
};

export default Button;

const StyledButton = styled.button`
  background-color: ${props => props?.disabled && `${COLOR.GRAY_300}`};
  color: ${props => props.disabled && `${COLOR.WHITE}`};
  ${props => props?.$styles}
`;