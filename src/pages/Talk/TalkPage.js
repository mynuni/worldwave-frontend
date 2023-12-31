import React, {useEffect, useRef, useState} from 'react';
import ChatRoomContainer from "../../components/Chat/ChatRoomContainer";
import ChatMessageContainer from "../../components/Chat/ChatMessageContainer";
import styled from "styled-components";
import SockJS from "sockjs-client";
import {API_PATHS} from "../../constants/path";
import Stomp from "stompjs";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";
import {useQueryClient} from "react-query";

const TalkPage = () => {

        const [selectedChatRoom, setSelectedChatRoom] = useState();
        const [selectedChatRoomData, setSelectedChatRoomData] = useState({});
        const stompClientRef = useRef(null);
        const [currentSubscribe, setCurrentSubscribe] = useState(null);
        const [messages, setMessages] = useState([]);
        const user = useRecoilValue(userSelector);
        const queryClient = useQueryClient();

        const handleChangeChatRoom = (chatRoomId) => {
            setSelectedChatRoom(chatRoomId);
        };

        useEffect(() => {
            const socket = new SockJS(process.env.REACT_APP_SERVER_BASE_URL + API_PATHS.WEB_SOCKET_CHAT);
            stompClientRef.current = Stomp.over(socket);
            stompClientRef.current.debug = null; // 콘솔에 디버그 메세지 출력 제거
            stompClientRef.current.connect({
                Authorization: "Bearer " + localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY)
            }, null);

            return () => {
                if (stompClientRef.current.connected) {
                    stompClientRef.current.disconnect();
                }
            };

        }, []);

        const subscribeChatRoom = (chatRoomId) => {
            if (currentSubscribe) currentSubscribe.unsubscribe();
            const headers = {participant_id: user.id};

            const subscribe = stompClientRef.current.subscribe(`/topic/chat/rooms/${chatRoomId}`, (message) => {
                // 받은 메세지를 배열의 맨 앞에 붙인다.
                const messageBody = JSON.parse(message.body);
                setMessages(prevState => [...prevState, messageBody]);

                if (["ENTER", "LEAVE"].includes(messageBody.chatMessageType)) {
                    queryClient.invalidateQueries("getChatRooms");
                }

            }, headers);

            setCurrentSubscribe(subscribe);
        };

        useEffect(() => {
            if (selectedChatRoom) {
                subscribeChatRoom(selectedChatRoom);
                setMessages([]);
            }
        }, [selectedChatRoom]);

        const handleSendMessage = (content, type) => {

            const message = {
                chatRoomId: selectedChatRoom,
                content: content,
                senderId: user.id,
                senderNickname: user.nickname,
                senderProfileImage: user.profileImgPath,
                chatMessageType: type
            };

            stompClientRef.current.send(`/pub/chat/rooms/${selectedChatRoom}`, {}, JSON.stringify(message));
        };

        return (
            <ChatContainer>
                <ChatRoomContainer selectedChatRoom={selectedChatRoom}
                                   setSelectedChatRoomData={setSelectedChatRoomData}
                                   handleChangeChatRoom={handleChangeChatRoom}
                                   subscribeChatRoom={subscribeChatRoom}
                                   handleSendMessage={handleSendMessage}
                                   stompClientRef={stompClientRef}/>
                <ChatMessageContainer messages={messages}
                                      setMessages={setMessages}
                                      selectedChatRoom={selectedChatRoom}
                                      selectedChatRoomData={selectedChatRoomData}
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
    height: calc(100vh - 60px);
`;