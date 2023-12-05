import React from 'react';
import {SectionContainer} from "../../pages/MyPage/MyPage.styles";
import styled from "styled-components";
import {useMutation, useQuery} from "react-query";
import {getMyLikes} from "../../apis/service/mypage";
import MyLikeCard from "./MyLikeCard";
import {toggleLike} from "../../apis/service/feed";
import Text from "../common/Text/Text";

const MyLike = () => {

    const {data} = useQuery({
        queryKey: ["getMyLikes"],
        queryFn: getMyLikes
    });

    const {mutate: toggleLikeMutation} = useMutation({
        mutationFn: toggleLike,
    });

    const handleToggleLike = (postId) => {
        toggleLikeMutation(postId);
    }

    return (
        <SectionContainer>
            <PageLayout>
                <LikedPostContainer>
                    {!data?.content.length && (
                        <Text>좋아요한 게시물이 없습니다.</Text>
                    )}
                    {data?.content.map((post) => (
                        <MyLikeCard
                            key={post.postId}
                            postId={post.postId}
                            authorId={post.authorId}
                            authorNickname={post.authorNickname}
                            authorProfileImage={post.authorProfileImage}
                            thumbnail={post.thumbnail}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            createdAt={post.createdAt}
                            liked={post.liked}
                            handleToggleLike={handleToggleLike}
                        />
                    ))}
                </LikedPostContainer>
            </PageLayout>
        </SectionContainer>
    );
};

export default MyLike;

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LikedPostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;