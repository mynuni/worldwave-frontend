import React from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";

const HorizonLine = ({children}) => {
    return (
        <Container>
            <StyledText>{children}</StyledText>
        </Container>
    );
};

export default HorizonLine;

const Container = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid ${COLOR.GRAY_300};
  line-height: 1px;
  margin: 10px 0;
  color: ${COLOR.GRAY_300};
  font-size: 14px;
`;

const StyledText = styled.span`
  background: ${COLOR.WHITE};
  padding: 0 8px;
  user-select: none;
`;