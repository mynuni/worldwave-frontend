import React, {useState} from 'react';
import styled from "styled-components";
import PhotoSlider from "./PhotoSlider";
import COLOR from "../../constants/color";
import Text from "../common/Text/Text";
import {AiFillLike} from "react-icons/ai";
import {useMutation, useQueryClient} from "react-query";
import {deletePost, toggleLike} from "../../apis/service/feed";
import {FaRegComment} from "react-icons/fa";
import CommentModal from "./CommentModal";
import {useRecoilValue} from "recoil";
import {userState} from "../../recoil/user";
import PostUpdateModal from "./PostUpdateModal";
import useTimeConvert from "../../hooks/useTimeConvert";
import {BsDot} from "react-icons/bs";
import MemberDetailModal from "../Member/MemberDetailModal";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";

const PostCard = ({
                      id,
                      authorId,
                      authorNickname,
                      profileImage,
                      content,
                      attachedFiles,
                      commentCount: initialCommentCount,
                      likeCount: initialLikeCount,
                      liked: initialLikeStatus,
                      createdAt,
                  }) => {

    const [likeStatus, setLikeStatus] = useState(initialLikeStatus);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const timeAgo = useTimeConvert(createdAt);
    const [commentCount, setCommentCount] = useState(initialCommentCount);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const {id: currentUserId} = useRecoilValue(userState);
    const queryClient = useQueryClient();
    const [openMemberDetailModal, setOpenMemberDetailModal] = useState(false);
    const navigate = useNavigate();

    const toggleLikeMutation = useMutation(
        () => toggleLike(id),
        {
            onMutate: async () => {
                const previousData = queryClient.getQueryData('likes');
                const optimisticData = {
                    alreadyLiked: !likeStatus,
                    likeCount: likeStatus ? likeCount - 1 : likeCount + 1,
                };
                setLikeStatus(optimisticData.alreadyLiked);
                setLikeCount(optimisticData.likeCount);
                queryClient.setQueryData('likes', optimisticData);
                return {previousData};
            },
            onError: (err, variables, context) => {
                queryClient.setQueryData('likes', context.previousData);
            },
        }
    );

    const handleToggleLike = () => {
        toggleLikeMutation.mutate(id);
    };


    const deletePostMutation = useMutation(
        () => deletePost(id),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["getPosts"]);
                alert("게시글이 삭제되었습니다.");
            }
        }
    );

    const handleDeletePost = () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) deletePostMutation.mutate();
    }

    const handleClickUpdate = () => {
        setEditModalOpen(true);
    }

    return (
        <Container>
            <TitleWrap>
                <ProfileImageWrap onClick={() => navigate(CLIENT_PATHS.MEMBER + authorId)}>
                    <img src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + profileImage}/>
                </ProfileImageWrap>
                <Text bold onClick={() => navigate(CLIENT_PATHS.MEMBER + authorId)}
                      styles={{cursor: "pointer"}}>{authorNickname}</Text>
                <BsDot/>
                <span>{timeAgo}</span>
                {currentUserId === authorId &&
                    <PostControlBox>
                        <span onClick={handleClickUpdate}>수정</span>
                        {editModalOpen && <PostUpdateModal
                            postId={id}
                            content={content}
                            attachedFiles={attachedFiles}
                            editModalOpen={editModalOpen}
                            handleClose={() => setEditModalOpen(false)}/>}
                        <span onClick={handleDeletePost}>삭제</span>
                    </PostControlBox>
                }
            </TitleWrap>
            <PhotoSlider attachedFiles={attachedFiles}/>
            <StatisticsContainer>
                <StatisticsItem onClick={handleToggleLike}>
                    <StyledLikeIcon isLiked={likeStatus}/>
                    <Text>{likeCount}</Text>
                </StatisticsItem>
                <StatisticsItem onClick={() => setCommentModalOpen(true)}>
                    <StyledCommentIcon/>
                    <Text>{commentCount}</Text>
                </StatisticsItem>
            </StatisticsContainer>
            <ContentContainer>
                <AuthorNickname>{authorNickname}</AuthorNickname>{content}
            </ContentContainer>
            <CommentContainer onClick={() => setCommentModalOpen(true)}>댓글 작성하기</CommentContainer>
            <CommentModal
                postId={id}
                open={commentModalOpen}
                onCreated={() => setCommentCount(commentCount + 1)}
                onDelete={() => setCommentCount(commentCount - 1)}
                onClose={() => setCommentModalOpen(false)}
            />
            <MemberDetailModal memberId={authorId}
                               open={openMemberDetailModal}
                               handleClose={() => setOpenMemberDetailModal(false)}/>
        </Container>
    );
};

export default PostCard;

const Container = styled.div`
    width: 500px;
    border: 1px solid ${COLOR.GRAY_200};
    border-radius: 4px;
`;

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 4px;
    border-bottom: 1px solid ${COLOR.GRAY_200};
`;

const ProfileImageWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    width: 60px;
    height: 60px;
    cursor: pointer;

    & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid ${COLOR.GRAY_200};
    }
`;

const AuthorNickname = styled.span`
    font-weight: bold;
    margin-right: 6px;
`;

const ContentContainer = styled.div`
    padding: 12px;
    white-space: pre-line;
`;

const StatisticsContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
`;

const StatisticsItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 12px;
`;

const CommentContainer = styled.div`
    display: inline-block;
    margin: 12px;
    cursor: pointer;
    color: ${COLOR.GRAY_400};
`;

export const StyledLikeIcon = styled(AiFillLike)`
    font-size: 22px;
    margin-right: 4px;
    padding-bottom: 2px;
    cursor: pointer;
    color: ${props => (props.isLiked ? COLOR.BLUE : COLOR.GRAY_300)};
`;

export const StyledCommentIcon = styled(FaRegComment)`
    font-size: 22px;
    color: ${COLOR.GRAY_400};
    margin-right: 4px;
    padding-bottom: 2px;
    cursor: pointer;
`;

const PostControlBox = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 10px;
    color: ${COLOR.GRAY_400};
    font-size: 14px;

    & > span {
        margin-left: 10px;
        cursor: pointer;
    }
`;