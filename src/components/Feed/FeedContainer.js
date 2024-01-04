import React, {useEffect, useState} from 'react';
import {useInfiniteQuery} from "react-query";
import {getPosts} from "../../apis/service/feed";
import PostCard from "./PostCard";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import {CircularProgress} from "@mui/material";
import Text from "../common/Text/Text";
import COLOR from "../../constants/color";
import Button from "../common/Button/Button";
import MemberDetailModal from "../Member/MemberDetailModal";
import {useNavigate} from "react-router-dom";

const FeedContainer = ({sort = ""}) => {

    const navigate = useNavigate();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery(
        ["getPosts"],
        ({pageParam = 0}) => (pageParam !== null ? getPosts(pageParam, sort) : null),
        {
            getNextPageParam: (lastPage) =>
                lastPage?.last ? null : lastPage?.number + 1,
            cacheTime: 0,
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
        };

        fetchData();
    }, [sort, refetch]);

    const loadNextPage = async () => {
        if (!isFetchingNextPage && hasNextPage) {
            await fetchNextPage();
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (data?.pages[0]?.content?.length) {
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={loadNextPage}
                hasMore={hasNextPage}
                loader={<CircularProgress/>}
            >
                <Container>
                    {data.pages.map((page, pageIndex) => (
                        <PostContainer key={pageIndex}>
                            {page?.content?.map((post) => (
                                <PostCard
                                    key={post.id}
                                    id={post.id}
                                    authorId={post.authorId}
                                    authorNickname={post.authorNickname}
                                    profileImage={post.profileImage}
                                    content={post.content}
                                    attachedFiles={post.attachedFiles}
                                    likeCount={post.likeCount}
                                    commentCount={post.commentCount}
                                    createdAt={post.createdAt}
                                    initialCommentCount={post.commentCount}
                                    initialLikeStatus={post.liked}
                                    postId={post.id}
                                    liked={post.liked}
                                    refetch={refetch}
                                />
                            ))}
                        </PostContainer>
                    ))}
                </Container>

                {!hasNextPage && <LastPageContainer>
                    <Text color={COLOR.GRAY_400}>마지막 게시글입니다.</Text>
                    <StyledButton onClick={scrollToTop}>상단으로 이동하기</StyledButton>
                </LastPageContainer>}
            </InfiniteScroll>
        );
    } else {
        return <EmptyPostContainer>
            <EmptyPost>게시글이 없습니다.<br/>
                더 많은 소식을 보고 싶으면 새로운 친구를 팔로우해보세요.
            </EmptyPost>
            <StyledButton onClick={() => navigate("/people")}>친구 찾으러 가기</StyledButton>
        </EmptyPostContainer>;
    }

};

export default FeedContainer;

const Container = styled.div`
  margin-top: 10px;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LastPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
`;

const StyledButton = styled(Button)`
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  padding: 10px 20px;
  width: 100%;
  margin-top: 10px;
`;

const EmptyPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`;

const EmptyPost = styled.p`
  text-align: center;
  font-size: 18px;
  color: ${COLOR.GRAY_400};
  margin-top: 10px;
`;