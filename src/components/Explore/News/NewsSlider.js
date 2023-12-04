import React, {useState} from 'react';
import {useQuery} from "react-query";
import {getPopularNews} from "../../../apis/service/explore";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import NewsCard from "./NewsCard";
import Text from "../../common/Text/Text";
import {LoadingSpinner, PaginationWrap} from "../ExploreDetail";
import styled from "styled-components";

const NewsSlider = ({regionCode}) => {

    const [page, setPage] = useState(1);

    const {data, isFetching, isError} = useQuery({
        queryKey: ['getPopularNews', {regionCode, page}],
        queryFn: () => getPopularNews(regionCode, page),
    });

    const handlePrevClick = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextClick = () => {
        if (data?.articles.length > 0) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div>
            {isFetching ? (
                <Contents>
                    <LoadingSpinner/>
                </Contents>
            ) : (
                <Contents>
                    {data?.articles.map((news, index) => (
                        <NewsCard key={index}
                                  title={news.title}
                                  description={news.description}
                                  urlToImage={news.urlToImage}
                                  url={news.url}
                        />
                    ))}
                    <PaginationWrap>
                        <button onClick={handlePrevClick} disabled={
                            page === 1 || data?.articles.length === 0
                        }>
                            <GrFormPrevious/></button>
                        <button onClick={handleNextClick} disabled={
                            data?.articles.length === 0
                        }>
                            <GrFormNext/></button>
                    </PaginationWrap>
                </Contents>
            )}
            {isError && <Text color={'red'}>News API 호출 횟수 초과</Text>}
        </div>
    );
};

export default NewsSlider;

const Contents = styled.div`
  min-height: 300px;
`;