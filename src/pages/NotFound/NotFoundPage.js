import React from 'react';
import {Container, PageLayout, StyledNavLink} from "./NotFoundPage.styles";
import Text from "../../components/common/Text/Text";
import Logo from "../../components/common/Logo/Logo";
import Path from "../../constants/path";

const NotFoundPage = () => {
    return (
        <PageLayout>
            <Container>
                <Logo/>
                <Text bold size="large">요청하신 페이지를 찾을 수 없습니다.</Text>
                <Text>페이지의 주소가 올바르지 않거나 다른 위치로 변경되었을 수 있습니다.</Text>
                <StyledNavLink to={Path.HOME}>홈으로 이동하기</StyledNavLink>
            </Container>
        </PageLayout>
    );
};

export default NotFoundPage;