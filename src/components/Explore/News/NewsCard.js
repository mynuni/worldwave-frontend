import React from 'react';
import styled from "styled-components";
import COLOR from "../../../constants/color";

const NewsCard = ({
                      title,
                      description,
                      urlToImage,
                      url,
                  }) => {

    return (
        <Container>
            <ContentWrap onClick={() => window.open(url, '_blank', 'width=800, height=600, left=50%, top=50%')}>
                <ArticleTitle bold size={"small"}>{title}</ArticleTitle>
                <ArticleContent size={"small"}>{description}</ArticleContent>
            </ContentWrap>
            {urlToImage && <ImageWrap>
                <img src={urlToImage}/>
            </ImageWrap>}
        </Container>
    );
};

export default NewsCard;

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;

  cursor: pointer;

  &:hover {
    color: ${COLOR.BLUE};
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageWrap = styled.div`
  width: auto;
  height: 80px;
  overflow: hidden;
  border-radius: 4px;
  margin-left: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`;

const ArticleTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  width: 600px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ArticleContent = styled.div`
  width: 600px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  color: ${COLOR.GRAY_400};

`;
