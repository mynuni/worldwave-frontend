import React, {useState} from 'react';
import {CircularProgress, TextField} from "@mui/material";
import {sendVerificationCode} from "../../apis/service/auth";
import Text from "../common/Text/Text";
import Button from "../common/Button/Button";
import useValidation from "../../hooks/useValidation";
import {sendButtonStyle} from "./SignUpForm";

const EmailStep = ({formData, onChange, handleNextStep}) => {

    const [isLoading, setIsLoading] = useState(false);
    const {validateEmail, emailError} = useValidation();

    const handleSendCode = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const isValid = await validateEmail(formData.email);
            if (isValid) {
                await sendVerificationCode(formData.email);
                handleNextStep();
            }
        } catch (error) {
            alert(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isLoading ?
                <Text size="small">사용하실 이메일을 입력해주세요.</Text> :
                <Text size="small">인증 번호를 전송 중입니다.</Text>}
            <TextField label="이메일"
                       name="email"
                       onChange={onChange}
                       disabled={isLoading}
                       error={!!emailError}
                       helperText={emailError}
                       fullWidth/>
            <Button type="submit"
                    onClick={handleSendCode}
                    isLoading={isLoading}
                    disabled={isLoading}
                    styles={sendButtonStyle}>
                {isLoading ? <CircularProgress size={25} color="grey"/> : "인증 번호 전송"}
            </Button>
        </>
    );
};

export default EmailStep;