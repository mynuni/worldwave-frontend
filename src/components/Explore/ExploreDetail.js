import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import {useQuery} from "react-query";
import {getPopularNews, getPopularVideos} from "../../apis/service/explore";
import {CircularProgress} from "@mui/material";
import {searchMembers} from "../../apis/service/member";
import Text from "../common/Text/Text";
import {getKoreanLabel} from "../../hooks/useProfileConvert";
import Flag from "../common/Flag/Flag";
import {IoCloseCircleOutline} from "react-icons/io5";
import NewsCard from "./News/NewsCard";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import VideoCard from "./Video/VideoCard";
import VideoSlider from "./Video/VideoSlider";
import MemberSlider from "./Member/MemberSlider";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";
import NewsSlider from "./News/NewsSlider";

const ExploreDetail = ({regionCode, closeModal}) => {

    const countryName = getKoreanLabel(regionCode);
    const navigate = useNavigate();

    return (
        <ExploreDetailContainer>
            <Heading>
                <Flag country={regionCode} width={40}
                      style={{marginBottom: "4px", border: `1px solid ${COLOR.GRAY_200}`}}/>
                <Text bold>{countryName}</Text>
                <CloseButton onClick={closeModal}/>
            </Heading>
            <ContentContainer>
                <ContentTitleWrap>
                    <Text bold size={"medium"}>사람들</Text>
                    <Text color={COLOR.BLUE}
                          size={"small"}
                          styles={{cursor: "pointer", marginLeft: "auto",}}
                          onClick={() => navigate(CLIENT_PATHS.PEOPLE)}>더 많은 친구 찾기</Text>
                </ContentTitleWrap>
                <MemberSlider regionCode={regionCode}/>
            </ContentContainer>
            <ContentContainer>
                <ContentTitleWrap>
                    <Text bold size={"medium"}>주요 뉴스</Text>
                </ContentTitleWrap>
                <ContentWrap>
                    <NewsSlider regionCode={regionCode}/>
                </ContentWrap>
            </ContentContainer>
            <ContentContainer>
                <ContentTitleWrap>
                    <Text bold size={"medium"}>인기 동영상</Text>
                </ContentTitleWrap>
                <ContentWrap>
                    <VideoSlider regionCode={regionCode}/>
                </ContentWrap>
            </ContentContainer>
        </ExploreDetailContainer>
    );
};

export default ExploreDetail;

const ExploreDetailContainer = styled.div`
  width: 800px;
  height: 600px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${COLOR.GRAY_100};
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLOR.GRAY_300};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${COLOR.GRAY_400};
  }

  background-color: ${COLOR.WHITE};
  border-radius: 4px;
  border: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`;


const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-bottom: 1px solid ${
          COLOR.GRAY_200
  };
`;

const ContentContainer = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  overflow: hidden;
  padding: 20px 20px 0 20px;
`;

export const ContentTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ContentWrap = styled.div`

`;

export const LoadingSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;
`;

const CloseButton = styled(IoCloseCircleOutline)`
  margin-left: auto;
  cursor: pointer;
  font-size: 30px;
  color: ${
          COLOR.GRAY_400
  };
  transition: color 0.1s ease;

  &:hover {
    color: ${COLOR.BLACK_200};
  }
`;

export const PaginationWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid ${COLOR.GRAY_200};
    border-radius: 50%;
    cursor: pointer;
    background-color: ${COLOR.WHITE};
    transition: background-color 0.1s ease;

    &:hover {
      background-color: ${COLOR.GRAY_100};
    }

    &:disabled {
      cursor: default;
      background-color: ${COLOR.GRAY_100};
    }

`;