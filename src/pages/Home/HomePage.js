import React from 'react';
import COLOR from "../../constants/color";
import earthImage from '../../assets/earth.png';
import {ReactComponent as LogoWhite} from "../../assets/logo-white.svg";
import Text from "../../components/common/Text/Text";
import GoogleLoginButton from "../../components/common/LoginButton/GoogleLoginButton";
import EmailLoginButton from "../../components/common/LoginButton/EmailLoginButton";
import Logo from "../../components/common/Logo/Logo";
import {Container, IntroContainer, introStyles, LoginContainer, LogoWrap, PageLayout} from "./HomePage.styles";
import FormFooter from "../../components/Auth/FormFooter";
import {FooterWrap} from "../Login/LoginPage.styles";
import GuestLoginButton from "../../components/common/LoginButton/GuestLoginButton";

const HomePage = () => {

    return (
        <PageLayout>
            <Container>
                <IntroContainer>
                    <LogoWhite/>
                    <Text bold
                          size="large"
                          color={COLOR.WHITE}
                          styles={introStyles}>세계 이슈와 친구들의 소식을 확인해보세요.</Text>
                    <img src={earthImage} alt="Earth.png" style={{width: "500px", alignSelf: "center"}}/>
                </IntroContainer>
                <LoginContainer>
                    <LogoWrap>
                        <Logo/>
                    </LogoWrap>
                    <GoogleLoginButton/>
                    <EmailLoginButton/>
                    <GuestLoginButton/>
                    <FooterWrap>
                        <FormFooter/>
                    </FooterWrap>
                </LoginContainer>
            </Container>
        </PageLayout>
    );
};

export default HomePage;