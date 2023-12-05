import React, {useState} from 'react';
import styled from "styled-components";
import PostCard, {StyledCommentIcon, StyledLikeIcon} from "../Feed/PostCard";
import useTimeConvert from "../../hooks/useTimeConvert";
import Text from "../common/Text/Text";
import COLOR from "../../constants/color";
import useModal from "../../hooks/useModal";
import {useQuery} from "react-query";
import {getPost} from "../../apis/service/feed";

const MyLikeCard = (
    {
        postId,
        authorId,
        authorNickname,
        authorProfileImage,
        thumbnail,
        likeCount,
        commentCount,
        createdAt,
        liked,
        handleToggleLike
    }) => {

    const {Modal, isOpen, close, open} = useModal();
    const timeAgo = useTimeConvert(createdAt);
    const [likeToggleStatus, setLikeToggleStatus] = useState({
        likeStatus: liked,
        likeCount: likeCount
    });

    const {data: post, isLoading: isPostLoading} = useQuery({
        queryKey: ["getPost", postId],
        queryFn: () => getPost(postId),
        enabled: isOpen,
    });

    return (
        <Wrapper onClick={open}>
            <TitleWrap>
                <ProfileImage src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + authorProfileImage}/>
                <Text size={"small"} bold>{authorNickname}</Text>
                <Text size={"small"} styles={{marginLeft: "auto"}}>{timeAgo}</Text>
            </TitleWrap>
            <ThumbnailWrap>
                <ThumbnailImage src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + thumbnail}/>
            </ThumbnailWrap>
            <FooterWrap>
                <StyledLikeIcon onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLike(postId)
                    setLikeToggleStatus({
                        ...likeToggleStatus,
                        likeStatus: !likeToggleStatus.likeStatus,
                        likeCount: likeToggleStatus.likeStatus ? likeToggleStatus.likeCount - 1 : likeToggleStatus.likeCount + 1
                    })
                }} isLiked={likeToggleStatus.likeStatus}/>
                <Text size={"small"} styles={{marginLeft: "-8px"}}>{likeToggleStatus.likeCount}</Text>
                <StyledCommentIcon/>
                <Text size={"small"} styles={{marginLeft: "-8px"}}>{commentCount}</Text>
            </FooterWrap>
            <Modal isOpen={isOpen} close={close}>
                {!isPostLoading && post &&
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
                    />}
            </Modal>
        </Wrapper>
    );
};

export default MyLikeCard;

const Wrapper = styled.div`
  width: 200px;
  border: 1px solid ${COLOR.GRAY_300};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.04);
  }
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px;
  gap: 4px;
`;

const ThumbnailWrap = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const FooterWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px;
  gap: 8px;
`;