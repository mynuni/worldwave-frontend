import React from 'react';
import {LoginContainer, PageLayout} from "./LoginPage.styles";
import Logo from "../../components/common/Logo/Logo";
import Text from "../../components/common/Text/Text";
import HorizonLine from "../../components/common/HorizonLine/HorizonLine";
import LoginForm from "../../components/Auth/LoginForm";
import GoogleLoginButton from "../../components/common/LoginButton/GoogleLoginButton";
import FormFooter from "../../components/Auth/FormFooter";

const LoginPage = () => {
    return (
        <PageLayout>
            <LoginContainer>
                <Logo/>
                <Text size="large">로그인</Text>
                <LoginForm/>
                <HorizonLine>또는</HorizonLine>
                <GoogleLoginButton/>
                <FormFooter/>
            </LoginContainer>
        </PageLayout>
    );
};

export default LoginPage;