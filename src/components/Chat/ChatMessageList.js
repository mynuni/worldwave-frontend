import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import ChatMessageItem from "./ChatMessageItem";
import {LoadingSpinner} from "../Explore/ExploreDetail";

const ChatMessageList = ({
                             selectedChatRoom,
                             isFetching,
                             isFetchingNextPage,
                             messages,
                             fetchNextPage,
                             hasNextPage,
                         }) => {
    const scrollRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollPosition;
        }
    }, [messages]);

    useEffect(() => {
        if (scrollRef.current) {
            setScrollPosition(0);
        }
    }, [selectedChatRoom]);

    const handleLoadPreviousClick = () => {
        setScrollPosition(scrollRef.current);
        fetchNextPage();
    };

    return (
        <Container ref={scrollRef}>
            <MessageList>
                {isFetching && <LoadingSpinner/>}
                {hasNextPage &&
                    <LoadPreviousButton onClick={handleLoadPreviousClick}>
                        이전 채팅 불러오기
                    </LoadPreviousButton>}
                {messages.map((message, index) => (
                    <ChatMessageItem key={index}
                                     chatMessageId={message.chatMessageId}
                                     chatRoomId={message.chatRoomId}
                                     content={message.content}
                                     senderId={message.senderId}
                                     senderNickname={message.senderNickname}
                                     senderProfileImage={message.senderProfileImage}
                                     chatMessageType={message.chatMessageType}
                                     createdAt={message.createdAt}
                    />
                ))}
            </MessageList>
        </Container>
    );
};

export default ChatMessageList;

const Container = styled.div`
    flex: 1 1 400px;
    overflow-y: auto;
    height: calc(100% - 150px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MessageList = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const LoadPreviousButton = styled.button`
    margin: 0 auto;
    height: 40px;
    padding: 0 16px;
    background: ${COLOR.GRAY_200};
    color: white;
    cursor: pointer;

    &:hover {
        background: ${COLOR.GRAY_300};
    }

`;