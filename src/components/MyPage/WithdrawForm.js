import React, {useState} from 'react';
import {SectionContainer} from "../../pages/MyPage/MyPage.styles";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";
import styled from "styled-components";
import Button from "../common/Button/Button";
import COLOR from "../../constants/color";
import useWithdraw from "../../hooks/query/useWithdraw";
import {TextField} from "@mui/material";
import Text from "../common/Text/Text";

const WithdrawForm = () => {

    const userState = useRecoilValue(userSelector);
    const [password, setPassword] = useState("");
    const {withdrawFormUser, withdrawOAuth2User} = useWithdraw();

    const handleOAuth2WithdrawSubmit = () => {
        if (window.confirm("회원 탈퇴를 하시겠습니까?")) withdrawOAuth2User();
    };

    const handleFormUserSubmit = () => {
        if (window.confirm("회원 탈퇴를 하시겠습니까?")) withdrawFormUser(password);
    };

    return (
        <SectionContainer>
            <Text bold>회원 탈퇴</Text>
            <Text>회원 탈퇴 시 회원님의 모든 데이터가 삭제됩니다.</Text>
            {userState?.registerType === "GOOGLE" &&
                <>
                    <Text>[{userState.registerType}] 계정과의 연동도 해제됩니다.</Text>
                    <WithdrawButton onClick={handleOAuth2WithdrawSubmit}>회원 탈퇴</WithdrawButton>
                </>}
            {userState?.registerType === "FORM" &&
                <WithdrawContainer>
                    <TextField type="password"
                               label="비밀번호"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    <WithdrawButton onClick={handleFormUserSubmit}>회원 탈퇴</WithdrawButton>
                </WithdrawContainer>
            }
        </SectionContainer>
    )
        ;
};

export default WithdrawForm;

const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const WithdrawButton = styled(Button)`
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  padding: 6px 12px;
  margin: 12px 0;
  border: none;
  width: 222px;
  height: 40px;

  &:hover {
    filter: brightness(110%);
  }
`;