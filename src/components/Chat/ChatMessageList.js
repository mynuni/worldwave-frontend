import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ChatMessageItem from "./ChatMessageItem";
import {LoadingSpinner} from "../Explore/ExploreDetail";
import COLOR from "../../constants/color";

const ChatMessageList = ({
                             scrollRef,
                             isFetching,
                             isFetchingNextPage,
                             messages,
                             fetchNextPage,
                             hasNextPage,
                         }) => {

    const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

    useEffect(() => {

        if (scrollRef.current && isFetchingNextPage) {
            scrollRef.current.scrollTop = currentScrollPosition;
            return;
        }

        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, 100);

    }, [messages]);

    const handleLoadPreviousClick = () => {
        setCurrentScrollPosition(scrollRef.current.scrollTop);
        fetchNextPage();
    };

    if (isFetching) return <LoadingSpinner/>;

    return (
        <Container ref={scrollRef}>
            <MessageList>
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
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    max-height: calc(100% - 150px);
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;

    }
`;

const LoadPreviousButton = styled.button`
    display: block;
    margin: 12px auto;
    height: 40px;
    padding: 6px 12px;
    background: ${COLOR.GRAY_200};
    color: ${COLOR.WHITE};
    cursor: pointer;
`;

const MessageList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
