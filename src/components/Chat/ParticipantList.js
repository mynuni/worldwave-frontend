import React, {useEffect} from 'react';
import {useQuery} from "react-query";
import {getParticipants} from "../../apis/service/talk";
import styled from "styled-components";
import {CloseButton, LoadingSpinner} from "../Explore/ExploreDetail";
import ParticipantItem from "./ParticipantItem";
import COLOR from "../../constants/color";

const ParticipantList = ({selectedChatRoom, close, selectedChatRoomData}) => {

    const {data, isFetching, refetch} = useQuery({
        queryKey: ["getParticipants", selectedChatRoom],
        queryFn: () => getParticipants(selectedChatRoom),
        refetchOnWindowFocus: false,
        enabled: false,
    });

    useEffect(() => {
        refetch();
    }, []);

    if (isFetching) return <Container><LoadingSpinner/></Container>;

    return (
        <Container>
            <TitleWrap>
                <div>채팅방 참가자</div>
                <CloseButton onClick={close}/>
            </TitleWrap>
            {data?.map((participant) => (
                <ParticipantItem key={participant.id}
                                 id={participant.id}
                                 nickname={participant.nickname}
                                 profileImage={participant.profileImage}
                                 creatorId={selectedChatRoomData.creatorId}
                />
            ))}
        </Container>
    );
};

export default ParticipantList;

const Container = styled.div`
    width: 300px;
    height: 400px;
    overflow-y: auto;
`;

const TitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid ${COLOR.GRAY_100};
`;