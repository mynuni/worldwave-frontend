import React from 'react';
import emailImage from "../../../assets/email-icon.png"
import {ButtonWrap, StyledNavLink} from "./LoginButton.styles";
import {CLIENT_PATHS} from "../../../constants/path";

const EmailLoginButton = () => {
    return (
        <StyledNavLink to={CLIENT_PATHS.LOGIN}>
            <ButtonWrap>
                <img src={emailImage} alt="email-icon.png"/>
                <div>이메일 계정으로 시작하기</div>
            </ButtonWrap>
        </StyledNavLink>
    );
};

export default EmailLoginButton;