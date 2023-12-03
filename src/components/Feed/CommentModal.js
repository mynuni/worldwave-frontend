import React, {useState} from 'react';
import {Box, Modal, TextField} from "@mui/material";
import Button from "../common/Button/Button";
import styled from "styled-components";
import COLOR from "../../constants/color";
import {createComment, deleteComment, getComments} from "../../apis/service/feed";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import CommentCard from "./CommentCard";

const commentModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    backgroundColor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4,
}

const CommentModal = ({postId, open, onCreated, onDelete, onClose}) => {

    const [commentContent, setCommentContent] = useState("");
    const queryClient = useQueryClient();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery(
        ["getComments", postId],
        ({pageParam = 0}) => (pageParam !== null ? getComments(postId, pageParam) : null),
        {
            getNextPageParam: (lastPage) => {
                return lastPage.last ? null : lastPage.number + 1
            },
            enabled: open,
        }
    );

    const createCommentMutation = useMutation(
        async () => createComment(postId, commentContent),
        {
            onSuccess: () => {
                setCommentContent("");
                onCreated();
                refetch();
            },
            onError: (error) => {
                alert("댓글 작성에 실패했습니다.");
            },
        }
    );

    // 댓글 삭제
    const deleteCommentMutation = useMutation(
        async (commentId) => deleteComment(postId, commentId),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["getComments", postId]);
                onDelete();
                refetch();
            },
            onError: (error) => {
                alert("댓글 삭제에 실패했습니다.");
            },
        }
    );

    const handleDeleteComment = (id) => {
        const confirm = window.confirm("댓글을 삭제하시겠습니까?");
        if (!confirm) return;
        deleteCommentMutation.mutate(id);
    }

    const handleSubmit = () => {
        if (commentContent.length === 0) return alert("댓글을 입력해주세요.");
        createCommentMutation.mutate();
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={commentModalStyle}>
                    <CommentContainer>
                        {data && (
                            <CommentListContainer>
                                {data.pages.map((page, pageIndex) => (
                                    <React.Fragment key={pageIndex}>
                                        {page.content.map((comment) => (
                                            <CommentCard key={comment.id}
                                                         postId={postId}
                                                         commentId={comment.id}
                                                         authorId={comment.authorId}
                                                         authorNickname={comment.authorNickname}
                                                         authorProfileImage={comment.authorProfileImage}
                                                         createdAt={comment.createdAt}
                                                         content={comment.content}
                                                         refetch={refetch}
                                                         handleDeleteComment={handleDeleteComment}
                                            />
                                        ))}
                                    </React.Fragment>
                                ))}
                                {hasNextPage && (
                                    <ShowMoreButtonWrap>
                                        <StyledShowMoreButton onClick={() => fetchNextPage()}>
                                            댓글 더 보기</StyledShowMoreButton>
                                    </ShowMoreButtonWrap>
                                )}
                                {isFetchingNextPage && <div>Loading...</div>}
                                {data.pages[0].content.length === 0 && <NoComment>아직 댓글이 없습니다.</NoComment>}
                            </CommentListContainer>
                        )}
                    </CommentContainer>
                    <CommentWriteContainer>
                        <TextField value={commentContent}
                                   onChange={(e) => setCommentContent(e.target.value)}
                                   inputProps={{style: {height: "10px"}}} placeholder="댓글 내용"
                                   fullWidth/>
                        <StyledButton onClick={handleSubmit}>작성</StyledButton>
                    </CommentWriteContainer>
                </Box>
            </Modal>
        </>
    );
};

export default CommentModal;

const CommentContainer = styled.div`
  height: 500px;
`;

const CommentListContainer = styled.div`
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentWriteContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${
          COLOR.GRAY_300
  };
  width: 100%;
  padding-top: 10px;
`;

const StyledButton = styled(Button)`
  background-color: ${
          COLOR.BLUE
  };
  color: ${
          COLOR.WHITE
  };
  width: 60px;
  height: 45px;
  margin-left: 4px;
`;

const ShowMoreButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const StyledShowMoreButton = styled(Button)`
  background-color: ${COLOR.GRAY_300};;
  color: ${COLOR.WHITE};
  margin: 20px;
  padding: 8px;
`;

const NoComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${COLOR.GRAY_400};

`;