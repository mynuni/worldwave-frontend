import React, {useState} from 'react';
import Text from "../../common/Text/Text";
import {CircularProgress, TextField} from "@mui/material";
import Button from "../../common/Button/Button";
import {confirmCode} from "../../../apis/service/auth";
import {InfoTextContainer, sendButtonStyle} from "./SignUpForm";

const CodeStep = ({formData, onBlur, handleNextStep}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [verificationData, setVerificationData] = useState({
        email: formData.email,
        verificationCode: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleConfirmCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await confirmCode(verificationData);
            handleNextStep();
        } catch (error) {
            setErrorMessage(error.response.data);
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputCode = (e) => {
        setVerificationData({
            ...verificationData,
            verificationCode: e.target.value
        });
    }

    return (
        <>
            {!isLoading ?
                <InfoTextContainer>
                    <Text size="small">{formData.email}(으)로</Text>
                    <Text size="small">인증 번호가 전송되었습니다.</Text>
                    <Text size="small">인증 번호는 3분간 유효합니다.</Text>
                </InfoTextContainer> :
                <Text>인증 번호를 확인 중입니다.</Text>}
            <TextField type="password"
                       label="인증 번호"
                       name="verificationCode"
                       onChange={handleInputCode}
                       onBlur={onBlur}
                       disabled={isLoading}
                       error={!!errorMessage}
                       helperText={errorMessage}
                       fullWidth/>
            <Button type="submit"
                    onClick={handleConfirmCode}
                    isLoading={isLoading}
                    disabled={isLoading}
                    styles={sendButtonStyle}>
                {isLoading ? <CircularProgress size={25} color="grey"/> : "인증 번호 확인"}
            </Button>
        </>
    );
};

export default CodeStep;

