import React from 'react';
import styled from "styled-components";

const CustomButton2 = ({
                          sizeType,
                          backgroundType,
                          color,
                          onClick,
                          styles,
                          children,
                          ...props
                      }) => {
    return (
        <StyledButton
            sizeType={sizeType}
            backgroundType={backgroundType}
            color={color}
            onClick={onClick}
            styles={styles}
            {...props}>
            {children}
        </StyledButton>
    );
};

export default CustomButton2;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ color }) => color};
  width: 10px;
  height: 10px;
  
  background-color: ${({ color }) => color};
  color: ${({ color }) => color};

  ${({ backgroundType }) => backgroundStyle[backgroundType]};
  ${({ sizeType }) => buttonStyle[sizeType] || buttonStyle[BUTTON_SIZE_TYPE.SMALL]};

  &:hover {
    ${({ backgroundType }) => hoverStyle[backgroundType]};
  }

  & > *:not(:last-child) {
    margin-right: ${({ withIcon }) => withIcon && '1rem'};
  }

  ${({ styles }) => styles && styles}
  ${({ isSelected, selectedStyles }) => isSelected && selectedStyles}
`;

export const BUTTON_SIZE_TYPE = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
    LARGE: 'LARGE',
};

export const backgroundStyle = {
    FILLED: {
        color: "white",
    },
    OUTLINE: {
        backgroundColor: 'transparent',
    },
};

export const hoverStyle = {
    FILLED: {
        backgroundColor: '#3e909c',
    },
    OUTLINE: {
        backgroundColor: 'rgba(70, 159, 171, 0.08)',
    },
};

export const buttonStyle = {
    SMALL: {
        fontSize: '1.2rem',
    },
    MEDIUM: {
        padding: '0 1.2rem',
    },
    LARGE: {
        padding: '0 1.6rem',
    },

};