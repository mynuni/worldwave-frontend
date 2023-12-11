import React from 'react';
import {ButtonWrap} from "./LoginButton.styles";
import guestIcon from "../../../assets/guest-icon.png";
import {loginGuest} from "../../../apis/service/auth";
import {CLIENT_PATHS} from "../../../constants/path";

const GuestLoginButton = () => {

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
        <ButtonWrap onClick={handleLoginGuest}>
            <img src={guestIcon} alt="email-icon.png"/>
            <div>게스트 계정으로 시작하기</div>
        </ButtonWrap>
    );
};

export default GuestLoginButton;