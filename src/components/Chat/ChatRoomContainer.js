import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import {TbMessageCirclePlus} from "react-icons/tb";
import ChatRoomItem from "./ChatRoomItem";
import useModal from "../../hooks/useModal";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";
import {createChatRoom, getChatRooms} from "../../apis/service/talk";
import {useQuery} from "react-query";
import ChatRoomCreationForm from "./ChatRoomCreationForm";
import {LoadingSpinner} from "../Explore/ExploreDetail";

const ChatRoomContainer = ({selectedChatRoom, handleChangeChatRoom, subscribeChatRoom}) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredChatRooms, setFilteredChatRooms] = useState([]);
    const {Modal, isOpen, open, close} = useModal();

    const {data: chatRooms, isFetching, refetch: refetchChatRooms} = useQuery({
        queryKey: ["getChatRooms"],
        queryFn: getChatRooms,
        onSuccess: (data) => {
            setFilteredChatRooms(data);
        },
        refetchOnWindowFocus: false
    });

    const handleSearchChatRoom = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);

        const filteredRooms = chatRooms.filter((chatRoom) =>
            chatRoom.chatRoomName.toLowerCase().includes(keyword.toLowerCase())
        );

        setFilteredChatRooms(filteredRooms);
    };

    useEffect(() => {
        if (searchKeyword === "") {
            setFilteredChatRooms(chatRooms);
        }
    }, [searchKeyword, chatRooms]);

    if(isFetching) return <LoadingSpinner/>;

    return (
        <Container>
            <Heading>
                <ChatRoomSearchBar
                    type="search"
                    value={searchKeyword}
                    onChange={handleSearchChatRoom}
                    placeholder="채팅방 검색"
                />
                <CreateChatRoomButton onClick={open}/>
                <Modal isOpen={isOpen} close={close}>
                    <ChatRoomCreationForm close={close}
                                          subscribeChatRoom={subscribeChatRoom}
                                          handleChangeChatRoom={handleChangeChatRoom}
                                          refetchChatRooms={refetchChatRooms}/>
                </Modal>
            </Heading>
            <ChatRoomList>
                {filteredChatRooms.map(chatRoom => (
                    <ChatRoomItem key={chatRoom.chatRoomId}
                                  chatRoomId={chatRoom.chatRoomId}
                                  chatRoomName={chatRoom.chatRoomName}
                                  creatorId={chatRoom.creatorId}
                                  participantCount={chatRoom.participantCount}
                                  selectedChatRoom={selectedChatRoom}
                                  handleChangeChatRoom={handleChangeChatRoom}
                    />
                ))}
            </ChatRoomList>
        </Container>
    );
};

export default ChatRoomContainer;


const Container = styled.div`
    width: 300px;
    height: 100%;
    border: 1px solid silver;
    border-top: none;
`;

const Heading = styled.div`
    padding: 0 12px;
    gap: 12px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid silver;
`;

const CreateChatRoomButton = styled(TbMessageCirclePlus)`
    font-size: 32px;
    color: ${COLOR.GRAY_400};
    cursor: pointer;

    &:hover {
        color: ${COLOR.BLUE};
    }
`;

const ChatRoomSearchBar = styled.input`
    width: 100%;
    padding: 10px 12px;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    background-color: ${COLOR.GRAY_100};
    outline: ${COLOR.GRAY_300};

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        background: url("https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/cross_delete_remove_close-2-64.png") no-repeat;
        background-size: contain;
        cursor: pointer;
    }
`;

const ChatRoomList = styled.div`
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: auto;
    overflow-x: hidden;
`;