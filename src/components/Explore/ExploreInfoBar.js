import React from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import Text from "../common/Text/Text";

const ExploreInfoBar = () => {
    return (
        <Container>
            <Text size={"large"} color={"white"}>관심있는 국가를 선택하여 주요 뉴스와 인기 콘텐츠를 확인해보세요.</Text>
            <br/>
            <Text size={"medium"} color={"white"}>현재 서비스 중인 국가</Text>
            <Text size={"medium"} color={"white"}>대한민국, 미국, 일본, 영국, 캐나다, 사우디 아라비아 등</Text>
        </Container>
    );
};

export default ExploreInfoBar;

const Container = styled.div`
  margin-bottom: auto;
  width: 100%;
  height: 150px;
  background-color: ${COLOR.BLUE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${COLOR.WHITE};

`;