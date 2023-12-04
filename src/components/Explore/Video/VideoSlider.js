import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {getPopularVideos} from "../../../apis/service/explore";
import {useQuery} from "react-query";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {PaginationWrap} from "../ExploreDetail";
import VideoCard from "./VideoCard";
import {CircularProgress} from "@mui/material";

const VideoSlider = ({regionCode}) => {

    const [pageToken, setPageToken] = useState("");
    const [prevPageToken, setPrevPageToken] = useState("");
    const [nextPageToken, setNextPageToken] = useState("");

    const {data: videos, isFetching, isError} = useQuery({
        queryKey: ["popularVideos", {regionCode, pageToken}], queryFn: () => getPopularVideos(regionCode, pageToken),
    });

    useEffect(() => {
        if (!isFetching && !isError && videos) {
            const {prevPageToken, nextPageToken} = videos;
            setPrevPageToken(prevPageToken);
            setNextPageToken(nextPageToken);
        }
    }, [videos, isFetching, isError]);

    const handlePrevPageClick = () => {
        setPageToken(prevPageToken);
    };

    const handleNextPageClick = () => {
        setPageToken(nextPageToken);
    };

    if (isFetching) return <Container><CircularProgress/></Container>;

    return (<Container>
        <div>
            {videos.items.map((video) => (<VideoCard key={video.id}
                                                     videoId={video.id}
                                                     title={video.snippet.title}
                                                     description={video.snippet.description}
                                                     thumbnails={video.snippet.thumbnails}
                                                     channelTitle={video.snippet.channelTitle}
                                                     viewCount={video.statistics.viewCount}
                                                     publishedAt={video.snippet.publishedAt}
            />))}
        </div>
        <PaginationWrap>
            <button onClick={handlePrevPageClick} disabled={prevPageToken === undefined || prevPageToken === null}>
                <GrFormPrevious/></button>
            <button onClick={handleNextPageClick} disabled={nextPageToken === undefined || nextPageToken === null}>
                <GrFormNext/></button>
        </PaginationWrap>
    </Container>);
};

export default VideoSlider;

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;