import React from 'react';
import googleLogoImage from "../../../assets/google-icon.png"
import {ButtonWrap} from "./LoginButton.styles";

const GoogleLoginButton = () => {

    const googleLoginLocation = process.env.REACT_APP_GOOGLE_LOGIN_LOCATION;

    return (
        <ButtonWrap onClick={() => window.location.href = googleLoginLocation}>
            <img src={googleLogoImage} alt="email-icon.png"/>
            <div>Google 계정으로 시작하기</div>
        </ButtonWrap>
    );
};

export default GoogleLoginButton;