import React from 'react';
import {useInfiniteQuery} from "react-query";
import {getPostsByMemberId} from "../../apis/service/feed";
import styled from "styled-components";
import PostCard from "../Feed/PostCard";
import {CircularProgress} from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";

const MemberFeed = ({memberId}) => {

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["getPostsByMemberId", memberId],
        queryFn: ({pageParam = 0}) => getPostsByMemberId(memberId, pageParam),
        getNextPageParam: (lastPage) => lastPage.last ? undefined : lastPage.number + 1
    });

    const loadNextPage = async () => {
        if (!isFetchingNextPage && hasNextPage) {
            await fetchNextPage();
        }
    };

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={hasNextPage}
            loader={<CircularProgress/>}
        >
            {isLoading && <CircularProgress/>}
            <FeedContainer>
                {data?.pages.map((page) => (
                    <React.Fragment key={page.number}>
                        {page.content.map((post) => (
                            <PostCard key={post.id}
                                      id={post.id}
                                      authorId={post.authorId}
                                      content={post.content}
                                      authorNickname={post.authorNickname}
                                      attachedFiles={post.attachedFiles}
                                      photos={post.photos}
                                      commentCount={post.commentCount}
                                      liked={post.liked}
                                      likeCount={post.likeCount}
                                      createdAt={post.createdAt}
                                      profileImage={post.profileImage}/>
                        ))}
                    </React.Fragment>
                ))}
            </FeedContainer>
            {data?.pages[0]?.content.length < 1 && (
                <div>게시글이 없습니다.</div>
            )}
        </InfiniteScroll>
    );
};

export default MemberFeed;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;