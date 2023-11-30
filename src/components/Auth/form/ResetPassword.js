import React, {useState} from 'react';
import {PageLayout} from "../../../pages/Login/LoginPage.styles";
import {Container} from "../../../pages/SignUp/SignUpPage.styles";
import {CircularProgress, TextField} from "@mui/material";
import styled from "styled-components";
import Button from "../../common/Button/Button";
import Logo from "../../common/Logo/Logo";
import COLOR from "../../../constants/color";
import Text from "../../common/Text/Text";
import {SubmitButton} from "./FormStyles";
import useValidation from "../../../hooks/useValidation";
import {resetPassword, sendVerificationCode} from "../../../apis/service/auth";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../../constants/path";

const ResetPassword = () => {

    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const {validatePassword, passwordError, passwordConfirmError} = useValidation();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordChangeData, setPasswordChangeData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        passwordChangeToken: ""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPasswordChangeData({...passwordChangeData, [name]: value});
    };

    const handlePasswordBlur = () => {
        validatePassword(passwordChangeData.password, passwordChangeData.passwordConfirm);
    };

    const sendPasswordResetToken = async () => {
        setIsLoading(true);
        try {
            await sendVerificationCode(passwordChangeData.email);
            setStep(step + 1);
        } catch (error) {
            alert("인증 메일 전송에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = async () => {
        try {
            if (passwordError || passwordConfirmError) {
                alert("비밀번호를 다시 확인해주세요.");
                return;
            }
            await resetPassword(passwordChangeData);
            alert("비밀번호가 재설정되었습니다.");
            navigate(CLIENT_PATHS.LOGIN);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <PageLayout>
            <Container>
                <Logo/>
                <Text size="small">이메일 인증 후 비밀번호를 재설정합니다.</Text>
                <ButtonFieldWrap>
                    <TextField
                        label="이메일"
                        name="email"
                        onChange={handleInputChange}
                        fullWidth
                        disabled={step !== 0 || isLoading}
                    />
                    {step === 0 && <StyledInputButton onClick={sendPasswordResetToken}
                                                      disabled={step !== 0 || isLoading}>
                        {isLoading ? <CircularProgress size={25} color="grey"/> : "전송"}</StyledInputButton>}
                </ButtonFieldWrap>
                <ButtonFieldWrap>
                    <TextField
                        type="password"
                        name="passwordChangeToken"
                        label="인증 번호"
                        onChange={handleInputChange}
                        fullWidth
                        disabled={step === 0}
                    />
                </ButtonFieldWrap>
                <TextField
                    type="password"
                    name="password"
                    label="새로운 비밀번호"
                    onChange={handleInputChange}
                    onBlur={handlePasswordBlur}
                    error={!!passwordError}
                    helperText={passwordError}
                    fullWidth
                    disabled={step === 0}
                />
                <TextField
                    type="password"
                    label="비밀번호 확인"
                    name="passwordConfirm"
                    onChange={handleInputChange}
                    onBlur={handlePasswordBlur}
                    error={!!passwordConfirmError}
                    helperText={passwordConfirmError}
                    fullWidth
                    disabled={step === 0}
                />
                <SubmitButton onClick={handleSubmit} disabled={step === 0}>비밀번호 변경</SubmitButton>
            </Container>
        </PageLayout>
    );
};

export default ResetPassword;

const ButtonFieldWrap = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
`;

const StyledInputButton = styled(Button)`
  margin-left: 5px;
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  width: 80px;
  height: 100%;
`;

