import React from 'react';
import styled from "styled-components";
import Button from "../common/Button/Button";
import useTimeConvert from "../../hooks/useTimeConvert";
import {useRecoilValue} from "recoil";
import {userState} from "../../recoil/user";
import Text from "../common/Text/Text";
import COLOR from "../../constants/color";
import useModal from "../../hooks/useModal";
import {useQuery} from "react-query";
import {getPost} from "../../apis/service/feed";
import PostCard from "../Feed/PostCard";

const CommentItem = ({data, refetch, addToDeleteList, isSelected}) => {

    const user = useRecoilValue(userState);
    const time = useTimeConvert(data.createdAt);
    const {Modal, open, close, isOpen} = useModal();

    const {data: post, isLoading: isPostLoading} = useQuery({
        queryKey: ["getPost", data.postId],
        queryFn: () => getPost(data.postId),
        enabled: isOpen,
    });

    return (
        <Container>
            <StyledCheckBox
                type="checkbox"
                onChange={() => addToDeleteList(data.id)}
                checked={isSelected}
            />
            <ProfileImageWrap>
                <img src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + user.profileImgPath} alt="profile"/>
            </ProfileImageWrap>
            <ContentContainer>
                <TitleWrap>
                    <Text bold>{data.authorNickname}</Text>
                    <Text size={"small"} styles={{marginLeft: "8px"}}>{time}</Text>
                </TitleWrap>
                <div>{data.content}</div>
            </ContentContainer>
            <ButtonWrap>
                <StyledButton onClick={open}>게시글</StyledButton>
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
                            refetch={refetch}
                        />}
                </Modal>
            </ButtonWrap>

        </Container>
    );
};

export default CommentItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  gap: 10px;
`;

const StyledCheckBox = styled.input`
  cursor: pointer;
  zoom: 1.5;

`;

const ProfileImageWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrap = styled.div`
  margin-left: auto;
`;

const StyledButton = styled(Button)`
  width: 80px;
  cursor: pointer;
  background-color: ${COLOR.GRAY_100};
  color: ${COLOR.BLACK_100};
  font-size: 14px;
  border-radius: 6px;
  padding: 8px 12px;

  &:hover {
    background-color: ${COLOR.GRAY_200};
  }
`;