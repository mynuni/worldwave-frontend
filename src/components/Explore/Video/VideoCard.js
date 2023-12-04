import React from 'react';
import YouTube from "react-youtube";
import styled from "styled-components";
import Text from "../../common/Text/Text";
import useTimeConvert from "../../../hooks/useTimeConvert";
import COLOR from "../../../constants/color";
import {LuDot} from "react-icons/lu";

const VideoCard = ({
                       videoId,
                       title,
                       description,
                       thumbnails,
                       channelTitle,
                       viewCount,
                       publishedAt
                   }) => {

    const formatViewCount = (viewCount) => {
        if (viewCount < 1000) {
            return viewCount.toString(); // 1000 미만은 그대로 반환
        } else if (viewCount < 10000) {
            const thousands = Math.floor(viewCount / 1000);
            return `${thousands}천`;
        } else if (viewCount < 100000000) {
            const tenThousands = Math.floor(viewCount / 10000);
            return `${tenThousands}만`;
        } else {
            const hundredMillions = Math.floor(viewCount / 100000000);
            return `${hundredMillions}억`;
        }
    };

    const formatTime = useTimeConvert(publishedAt);

    return (
        <Container>
            <YouTube videoId={videoId} opts={opts}/>
            <Contents>
                <Title>{title}</Title>
                <TitleWrap style={{display: "flex",}}>
                    <Text bold size={"small"}>{channelTitle}</Text>
                    <LuDot/>
                    <Text size={"small"}>{formatViewCount(viewCount)}회</Text>
                    <LuDot/>
                    <Text size={"small"}>{formatTime}</Text>
                </TitleWrap>
                <Description>{description}</Description>
            </Contents>
        </Container>
    );
};

export default VideoCard;

const opts = {
    width: '320',
    height: '181',
}

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  gap: 6px;
`;

const Container = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Description = styled.div`
  font-size: 14px;
  color: ${COLOR.GRAY_400};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;