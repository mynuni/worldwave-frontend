import React, {useState} from 'react';
import {SectionContainer} from "../../pages/MyPage/MyPage.styles";
import {useQuery} from "react-query";
import {deleteComments, getMyComments} from "../../apis/service/mypage";
import CommentItem from "./CommentItem";
import Button from "../common/Button/Button";
import styled from "styled-components";
import Text from "../common/Text/Text";
import COLOR from "../../constants/color";
import {Pagination, PaginationItem} from "@mui/material";

const MyComment = () => {

    const [page, setPage] = useState(0);

    const {
        data: myComments,
        isLoading: myCommentsLoading,
        error: myCommentsError,
        refetch: myCommentsRefetch,
    } = useQuery({
        queryKey: ["myComments", page],
        queryFn: () => getMyComments(page),
        keepPreviousData: true,
    });

    const [deleteList, setDeleteList] = useState([]);

    const addToDeleteList = (commentId) => {
        setDeleteList((prevList) => {
            if (prevList.includes(commentId)) {
                return prevList.filter((id) => id !== commentId);
            } else {
                return [...prevList, commentId];
            }
        });
    };

    const toggleAllComments = () => {
        if (deleteList.length === myComments.content.length) {
            setDeleteList([]);
        } else {
            const allCommentIds = myComments.content.map((comment) => comment.id);
            setDeleteList(allCommentIds);
        }
    };

    const deleteSelectedComments = async () => {
        if (deleteList.length === 0) return window.alert("선택한 댓글이 없습니다.");
        if (!window.confirm(`선택한 ${deleteList.length}개의 댓글을 삭제하시겠습니까?`)) return;
        await deleteComments(deleteList);
        setDeleteList([]);
        myCommentsRefetch();
    };

    return (
        <SectionContainer>
            <Container>
                <Text size={"medium"} bold>내가 쓴 댓글</Text>
                <ButtonWrap>
                    <StyledSelectButton onClick={toggleAllComments} styles={
                        {
                            backgroundColor: COLOR.WHITE,
                            color: COLOR.BLACK_100,
                            border: `1px solid ${COLOR.GRAY_300}`,
                            width: "80px"
                        }
                    }>전체 선택</StyledSelectButton>
                    <StyledSelectButton onClick={deleteSelectedComments}
                                        disabled={deleteList.length === 0}
                                        styles={{
                                            backgroundColor: deleteList.length === 0 ? COLOR.GRAY_100 : COLOR.RED,
                                            color: deleteList.length === 0 ? COLOR.WHITE : COLOR.WHITE,
                                            width: "60px"
                                        }}>삭제</StyledSelectButton>
                </ButtonWrap>
                {myComments && (
                    <CommentListContainer>
                        {myComments?.content.length === 0 && (
                            <Text size={"small"} styles={{padding: "10px"}}>작성하신 댓글이 없습니다.</Text>
                        )}
                        {myComments?.content.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                data={comment}
                                refetch={myCommentsRefetch}
                                addToDeleteList={addToDeleteList}
                                isSelected={deleteList.includes(comment.id)}
                            />
                        ))}
                    </CommentListContainer>
                )}
                {myComments?.content.length > 0 &&
                    <PaginationContainer>
                        <Pagination
                            count={myComments?.totalPages}
                            page={myComments?.number + 1}
                            onChange={(e, page) => setPage(page - 1)}
                            renderItem={(item) => (
                                <PaginationItem
                                    disableRipple
                                    {...item}
                                />
                            )}
                        />
                    </PaginationContainer>}
            </Container>
        </SectionContainer>
    );
};

export default MyComment;

const Container = styled.div`
  width: 500px;
`;

const CommentListContainer = styled.div`
  border: 1px solid ${COLOR.GRAY_300};
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;

  & > button {
    margin-right: 10px;
  }
`;

const StyledSelectButton = styled(Button)`
  padding: 4px 6px;
  border-radius: 4px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;