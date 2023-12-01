import React from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import COLOR from "../../constants/color";
import {CLIENT_PATHS} from "../../constants/path";

const FormFooter = () => {
    return (
        <StyledList>
            <StyledNavLink to={CLIENT_PATHS.SIGN_UP}>회원가입</StyledNavLink>
            <StyledNavLink to={CLIENT_PATHS.RESET_PASSWORD}>비밀번호 찾기</StyledNavLink>
            <StyledNavLink to={process.env.REACT_APP_QNA_EMAIL}>문의하기</StyledNavLink>
        </StyledList>
    );
};

export default FormFooter;

const StyledList = styled.div`
  position: relative;
  bottom: -20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  width: 100%;
`;

const StyledNavLink = styled(NavLink)`
  color: ${COLOR.BLACK_100};
`;