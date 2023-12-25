import React, {useEffect, useRef, useState} from 'react';
import ChatRoomContainer from "../../components/Chat/ChatRoomContainer";
import ChatMessageContainer from "../../components/Chat/ChatMessageContainer";
import styled from "styled-components";
import SockJS from "sockjs-client";
import {API_PATHS} from "../../constants/path";
import Stomp from "stompjs";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";

const TalkPage = () => {

        const [selectedChatRoom, setSelectedChatRoom] = useState();
        const stompClientRef = useRef(null);
        const [currentSubscribe, setCurrentSubscribe] = useState(null);
        const [messages, setMessages] = useState([]);
        const user = useRecoilValue(userSelector);

        const handleChangeChatRoom = (chatRoomId) => {
            setSelectedChatRoom(chatRoomId);
        };

        useEffect(() => {
            const socket = new SockJS(process.env.REACT_APP_SERVER_BASE_URL + API_PATHS.WEB_SOCKET_CHAT);
            stompClientRef.current = Stomp.over(socket);

            stompClientRef.current.connect({
                Authorization: "Bearer " + localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY)
            }, null);

            return () => {
                // 언마운트 시 자원 반환
                stompClientRef.current.disconnect();
            };

        }, []);

        const subscribeChatRoom = (chatRoomId) => {
            if (currentSubscribe) currentSubscribe.unsubscribe();
            const headers = {participant_id: user.id};

            const subscribe = stompClientRef.current.subscribe(`/topic/chat/rooms/${chatRoomId}`, (data) => {
                // 받은 메세지를 배열의 맨 앞에 붙인다.
                setMessages(prevState => [...prevState, JSON.parse(data.body)]);
            }, headers);

            setCurrentSubscribe(subscribe);
        };

        useEffect(() => {
            if (selectedChatRoom) {
                subscribeChatRoom(selectedChatRoom);
                setMessages([]);
            }
        }, [selectedChatRoom]);

        const handleSendMessage = (message) => {
            stompClientRef.current.send(`/pub/chat/rooms/${selectedChatRoom}`, {}, JSON.stringify(message));
        };

        return (
            <ChatContainer>
                <ChatRoomContainer selectedChatRoom={selectedChatRoom}
                                   handleChangeChatRoom={handleChangeChatRoom}
                                   subscribeChatRoom={subscribeChatRoom}/>
                <ChatMessageContainer messages={messages}
                                      setMessages={setMessages}
                                      selectedChatRoom={selectedChatRoom}
                                      handleSendMessage={handleSendMessage}
                                      handleChangeChatRoom={handleChangeChatRoom}/>
            </ChatContainer>
        );
    }
;

export default TalkPage;

const ChatContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`;