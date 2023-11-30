import React from 'react';
import styled from "styled-components";
import COLOR from "../../../constants/color";

const Button2 = ({
                    variant,
                    width,
                    text,
                    isLoading,
                    disabled,
                    styles
                }) => {
    return (
        <StyledButton $variant={variant} width={width} disabled={disabled} styles={styles}>
            {text}
        </StyledButton>
    );
};

export default Button2;

const getButtonStyles = (variant) => {
    switch (variant) {
        case "blue":
            return `
                background-color: ${COLOR.BLUE};
                color: white;
            `;
        case "gray":
            return `
                background-color: gray;
                color: white;
            `;
        case "red":
            return `
                background-color: red;
                color: white;
            `;
        default:
            return `
                background-color: white;
                color: black;
            `;
    }
};

const StyledButton = styled.button`
  width: ${props => props.width ? props.width : "100%"};
  ${({$variant}) => getButtonStyles($variant)};

  &:hover {
    filter: brightness(110%);
  }

`;