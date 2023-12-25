import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import {IoLogOutOutline} from "react-icons/io5";
import {FaUser} from "react-icons/fa";
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import SockJS from "sockjs-client";
import {API_PATHS} from "../../constants/path";
import Stomp from "stompjs";
import Text from "../common/Text/Text";
import {RiChatOffLine} from "react-icons/ri";
import {useInfiniteQuery, useQuery} from "react-query";
import {getPreviousMessages} from "../../apis/service/talk";

const ChatMessageContainer = ({selectedChatRoom, messages, setMessages, handleSendMessage}) => {

    const {data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} = useInfiniteQuery({
        queryKey: ["getPreviousMessages", selectedChatRoom],
        queryFn: ({pageParam = 0}) => getPreviousMessages(selectedChatRoom, pageParam),
        getNextPageParam: (lastPage) => lastPage.last ? undefined : lastPage.number + 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: false,
        onSuccess: (data) => {
            const reversedData = data.pages.map((page) => page.content).flat().reverse();
            setMessages(reversedData);
        }
    });

    useEffect(() => {
        refetch();
    }, [selectedChatRoom]);

    if (!selectedChatRoom) return (
        <Container>
            <GuideWrap>
                <GuideTextArea>
                    <Text bold size={"large"}>선택한 대화방이 없습니다.</Text>
                    <ChatOfflineIcon/>
                </GuideTextArea>
            </GuideWrap>
        </Container>
    );

    return (
        <Container>
            <Heading>
                <LeaveButton/>
                <ChatRoomName>이름</ChatRoomName>
                <ParticipantsWrap>
                    <ParticipantsButton/>
                    <ParticipantsCount>8</ParticipantsCount>
                </ParticipantsWrap>
            </Heading>
            <ChatMessageList
                selectedChatRoom={selectedChatRoom}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                messages={messages}/>
            <ChatMessageInput selectedChatRoom={selectedChatRoom} handleSendMessage={handleSendMessage}/>
        </Container>
    );
};

export default ChatMessageContainer;

const Container = styled.div`
    flex: 1 1 400px;
    min-width: 400px;
    max-width: 800px;
    height: 100%;
    border: 1px solid silver;
    border-top: none;
    border-left: none;
    position: relative;
`;

const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    height: 60px;
    border-bottom: 1px solid silver;
`;

const LeaveButton = styled(IoLogOutOutline)`
    font-size: 28px;
    color: ${COLOR.GRAY_400};
    cursor: pointer;

    &:hover {
        color: ${COLOR.BLACK_200};
    }
`;

const ParticipantsWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
`;

const ParticipantsButton = styled(FaUser)`
    font-size: 18px;
    color: ${COLOR.BLACK_100};

    &:hover {
        color: ${COLOR.BLACK_200};
    }
`;

const ParticipantsCount = styled.span`
    font-size: 16px;
    padding-top: 3px;
`;

const ChatRoomName = styled.div`
    flex: 1 1 auto;
    margin-left: 14px;
    font-size: 18px;
    font-weight: bold;
    color: ${COLOR.BLACK_100};
`;

const GuideWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const GuideTextArea = styled.p`
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

const ChatOfflineIcon = styled(RiChatOffLine)`
    font-size: 100px;
    color: ${COLOR.GRAY_400};
`;