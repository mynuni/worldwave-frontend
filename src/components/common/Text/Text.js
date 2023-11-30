import React from 'react';
import styled from "styled-components";
import COLOR from "../../../constants/color";

const Text = ({size, bold, color, styles, children, onClick}) => {

    return (
        <StyledText size={size}
                    $bold={bold}
                    color={color}
                    styles={styles}
                    onClick={onClick}>
            {children}
        </StyledText>
    );
};

export default Text;

export const StyledText = styled.p`
  font-size: ${props => {
    switch (props?.size) {
      case 'small':
        return '14px';
      case 'medium':
        return '16px';
      case 'large':
        return '24px';
      default:
        return '18px';
    }
  }};
  font-weight: ${props => (props?.$bold ? "bold" : "normal")};
  color: ${props => props.color || `${COLOR.BLACK_100}`};
  ${props => props.styles};
`;