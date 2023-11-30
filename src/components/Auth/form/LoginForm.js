import React, {useState} from 'react';
import {FormContainer, Input, SubmitButton} from "./FormStyles";
import {login} from "../../../apis/service/auth";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../../constants/path";
import {useSetRecoilState} from "recoil";
import {authState} from "../../../recoil/auth";

const LoginForm = () => {

    const setAccessToken = useSetRecoilState(authState);
    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleBlur = (e) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const {email, password} = loginData;
            const response = await login(email, password);
            const {accessToken} = response;
            localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY, accessToken);
            setAccessToken(accessToken);
            navigate(CLIENT_PATHS.EXPLORE);
        } catch (error) {
            alert(error.response?.data.message || "인증 정보가 올바르지 않습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <Input type="text"
                   label="이메일"
                   name="email"
                   inputProps={{
                       onBlur: (e) => {
                           handleBlur(e);
                       }
                   }}
                   disabled={isLoading}
                   autoComplete="off"
                   fullWidth
            />
            <Input type="password"
                   label="비밀번호"
                   name="password"
                   inputProps={{
                       onBlur: (e) => {
                           handleBlur(e);
                       }
                   }}
                   disabled={isLoading}
                   fullWidth
            />
            <SubmitButton onClick={handleSubmit}>로그인</SubmitButton>
        </FormContainer>
    );
};

export default LoginForm;