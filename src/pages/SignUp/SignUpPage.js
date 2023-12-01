import React from 'react';
import {Container, PageLayout} from "./SignUpPage.styles";
import Logo from "../../components/common/Logo/Logo";
import Text from "../../components/common/Text/Text";
import SignUpForm from "../../components/Auth/SignUpForm";
import GoogleLoginButton from "../../components/common/LoginButton/GoogleLoginButton";
import HorizonLine from "../../components/common/HorizonLine/HorizonLine";

const SignUpPage = () => {

    return (
        <PageLayout>
            <Container>
                <Logo/>
                <Text size="large">회원가입</Text>
                <SignUpForm/>
                <HorizonLine>또는</HorizonLine>
                <GoogleLoginButton/>
            </Container>
        </PageLayout>
    );
}
export default SignUpPage;