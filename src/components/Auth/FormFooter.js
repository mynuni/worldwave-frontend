import React from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import COLOR from "../../constants/color";
import {CLIENT_PATHS} from "../../constants/path";
import {loginGuest} from "../../apis/service/auth";

const FormFooter = () => {

    const handleLoginGuest = async () => {
        try {
            const response = await loginGuest();
            const {accessToken} = response;
            localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY, accessToken);
            window.location.href = CLIENT_PATHS.EXPLORE;
        } catch (error) {
            alert(error.response?.data?.message || "게스트 로그인 실패");
        }
    }

    return (
        <StyledList>
            <StyledNavLink to={CLIENT_PATHS.SIGN_UP}>회원가입</StyledNavLink>
            <StyledNavLink to={CLIENT_PATHS.RESET_PASSWORD}>비밀번호 찾기</StyledNavLink>
            <div onClick={handleLoginGuest} style={{cursor: "pointer"}}>GUEST</div>
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