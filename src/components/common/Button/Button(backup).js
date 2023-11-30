import React from 'react';
import styled from "styled-components";

const ButtonBackup = ({onClick, styles, children, disabled}) => {

    return (
        <StyledButton onClick={onClick}
                      $styles={styles}
                      disabled={disabled}>{children}</StyledButton>
    );
};

export default ButtonBackup;

ButtonBackup.defaultProps = {
    color: 'inherit',
    backgroundColor: 'inherit',
    fontSize: 'inherit',
    $styles: {},
};

export const StyledButton = styled.button`
  border-radius: 6px;

  color: ${props => props.$styles.color};
  background-color: ${props => props.$styles.backgroundColor};
  width: ${props => props.$styles.width || "100%"};
  height: ${props => props.$styles.height || "100%"};
  font-size: ${props => props.$styles.fontSize};
  ${props => props.$styles}
`;