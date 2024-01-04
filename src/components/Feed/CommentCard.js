import React, {useState} from 'react';
import styled from "styled-components";
import useTimeConvert from "../../hooks/useTimeConvert";
import {userState} from "../../recoil/user";
import {useRecoilValue} from "recoil";
import {BsDot} from "react-icons/bs";
import {useMutation} from "react-query";
import {updateComment} from "../../apis/service/feed";
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";

const CommentCard = ({
                         postId,
                         commentId,
                         authorId,
                         authorNickname,
                         authorProfileImage,
                         createdAt,
                         content: initialContent,
                         handleDeleteComment,
                         refetch
                     }) => {

    const timeAgo = useTimeConvert(createdAt);
    const currentUser = useRecoilValue(userState);
    const [editMode, setEditMode] = useState(false);
    const [content, setContent] = useState(initialContent);
    const navigate = useNavigate();

    const updateCommentMutation = useMutation(
        async () => updateComment(postId, commentId, content),
        {
            onSuccess: () => {
                setEditMode(false);
                refetch();
            }
        }
    );

    const handleUpdateComment = () => {
        updateCommentMutation.mutate();
    }

    const handleCancelUpdate = () => {
        setEditMode(false);
        setContent(initialContent);
    }

    const handleContentChange = (e) => {
        if (e.target.value.length > 100) return alert("댓글은 100자 이내로 작성해주세요.");
        setContent(e.target.value);
    }

    return (
        <Container>
            <ProfilePhotoWrap>
                <img src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + authorProfileImage}/>
            </ProfilePhotoWrap>
            <div>
                <TitleContainer>
                    <CommentAuthor onClick={() => navigate(CLIENT_PATHS.MEMBER + authorId)}>{authorNickname}</CommentAuthor>
                    <BsDot/>
                    <span>{timeAgo}</span>
                    {currentUser.id === authorId &&
                        <CommentControl>
                            <BsDot/>
                            {editMode ?
                                <CommentUpdateBar>
                                    <span onClick={handleUpdateComment}>수정 완료</span>
                                    <BsDot/>
                                    <span onClick={handleCancelUpdate}>취소</span>
                                </CommentUpdateBar> : <span onClick={() => setEditMode(true)}>수정</span>}
                            <BsDot/>
                            <span onClick={() => handleDeleteComment(commentId)}>삭제</span>
                        </CommentControl>}
                </TitleContainer>
                {editMode ?
                    <ContentEditWrap>
                        <TextField
                            type="text"
                            value={content}
                            fullWidth
                            multiline={true}
                            onChange={handleContentChange}/>
                        <span>{content.length}/100자</span>
                    </ContentEditWrap>
                    :
                    <ContentWrap>{content}</ContentWrap>}
            </div>
        </Container>
    );
};

export default CommentCard;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 14px 16px;
  border-bottom: 1px solid #dbdbdb;
  font-size: 14px;
  line-height: 18px;
  color: #262626;
`;

const ProfilePhotoWrap = styled.div`
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  margin-right: 4px;
  cursor: pointer;
`;

const CommentControl = styled.div`
  display: flex;
  justify-self: flex-end;
  align-items: center;

  span {
    margin-left: 4px;
    cursor: pointer;
  }
`;

const CommentUpdateBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrap = styled.div`
  width: 100%;
`;

const ContentEditWrap = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;