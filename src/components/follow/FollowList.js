import React from 'react';
import styled from "styled-components";
import FollowItem from "./FollowItem";
import {getFollowers, getFollowings, toggleFollow} from "../../apis/service/member";
import {useInfiniteQuery, useMutation} from "react-query";
import Text from "../common/Text/Text";

const FollowList = ({type, memberId, close, refetch: refetchProfile}) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        refetch
    } = useInfiniteQuery({
        queryKey: ["getFollowByType", memberId],
        queryFn: ({pageParam = 0}) =>
            type === "followers"
                ? getFollowers(memberId, pageParam)
                : getFollowings(memberId, pageParam),

        getNextPageParam: (lastPage) => {
            const hasNextPage = !lastPage.last;
            return hasNextPage ? lastPage.number + 1 : undefined;
        },
        enabled: true,
        initialData: ["getFollowByType", memberId],
    });

    const {mutate: toggleFollowMutation} = useMutation({
        mutationFn: toggleFollow,
        onSuccess: () => {
            refetch();
            refetchProfile();
        }
    });

    const handleToggleFollow = (id) => {
        toggleFollowMutation(id);
    }

    if(!isFetching && data?.pages[0].content.length === 0) {
        return (
            <Container>
                <Text size={"medium"} bold styles={
                    {textAlign: "center", marginTop: "20px", marginBottom: "20px"}
                }>아무도 없습니다.</Text>
            </Container>
        )
    }

    return (
        <Container>
            {data?.pages?.map((page, pageIndex) => (
                <div key={pageIndex}>
                    {page.content.map((follow) => (
                        <FollowItem
                            key={follow.id}
                            memberId={follow.memberId}
                            profileImage={follow.profileImage}
                            nickname={follow.nickname}
                            country={follow.country}
                            followed={follow.followed}
                            handleToggleFollow={handleToggleFollow}
                            close={close}
                        />
                    ))}
                </div>
            ))}
            {hasNextPage && (
                <NextPageButton onClick={() => fetchNextPage()}>
                    {isFetchingNextPage ? "로딩중..." : "더보기"}
                </NextPageButton>
            )}
        </Container>
    );
};

export default FollowList;

const Container = styled.div`
  width: 400px;
  height: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ced4da;
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
`;

const NextPageButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  background-color: #ffffff;
  cursor: pointer;
  border-top: 1px solid #e9ecef;

  &:hover {
    background-color: #f1f3f5;
  }
`;