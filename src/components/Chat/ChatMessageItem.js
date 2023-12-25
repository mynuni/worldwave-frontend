import React from 'react';
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";

const ChatMessageItem = ({
                             chatMessageId,
                             chatRoomId,
                             content,
                             senderId,
                             senderNickname,
                             senderProfileImage,
                             chatMessageType,
                             createdAt
                         }) => {
    const user = useRecoilValue(userSelector);

    return (
        <Message isMyMessage={user.id === senderId}>
            {content}
        </Message>
    );
};

export default ChatMessageItem;

const Message = styled.div`
    align-self: ${(props) => (props?.isMyMessage ? 'flex-end' : 'flex-start')};
    background-color: ${(props) => (props?.isMyMessage ? '#4CAF50' : '#ddd')};
    color: ${(props) => (props?.isMyMessage ? 'white' : 'black')};
    padding: 10px;
    margin: 5px;
    border-radius: 8px;
`;