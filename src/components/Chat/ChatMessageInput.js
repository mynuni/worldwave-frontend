import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {IoIosSend} from "react-icons/io";
import COLOR from "../../constants/color";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";

const ChatMessageInput = ({selectedChatRoom, handleSendMessage}) => {

    const user = useRecoilValue(userSelector);
    const inputRef = useRef();
    const [messageInput, setMessageInput] = useState("");

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (messageInput.trim() === "") return;
        setMessageInput("");

        const message = {
            chatRoomId: selectedChatRoom,
            content: messageInput,
            senderId: user.id,
            senderNickname: user.nickname,
            senderProfileImage: user.profileImgPath,
            chatMessageType: "CHAT"
        };

        handleSendMessage(message);
    };

    return (
        <Container>
            <input type="text"
                   ref={inputRef}
                   name="message"
                   value={messageInput}
                   onChange={handleInputChange}
                   onKeyDown={handleKeyDown}
                   autoComplete={"off"}/>
            <SendMessageButton onClick={handleSubmit}
                               disabled={!messageInput || messageInput === ""}>
                <SendMessageIcon/>
            </SendMessageButton>
        </Container>
    );
};

export default ChatMessageInput;

const Container = styled.div`
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 10px;
    display: flex;
    align-items: center;
    padding: 10px 12px;
    gap: 8px;

    input {
        width: 100%;
        padding: 15px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        background-color: ${COLOR.GRAY_100};
        outline: ${COLOR.GRAY_300};
    }
`;

const SendMessageButton = styled.button`
    width: 48px;
    height: 48px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: ${COLOR.WHITE};
    background-color: ${(props) => props?.disabled ? COLOR.GRAY_100 : COLOR.BLUE};

`;

const SendMessageIcon = styled(IoIosSend)`
    font-size: 28px;
`;