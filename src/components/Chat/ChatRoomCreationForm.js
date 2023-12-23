import React, {useState} from 'react';
import styled from "styled-components";
import Text from "../common/Text/Text";
import COLOR from "../../constants/color";
import {useMutation} from "react-query";
import {createChatRoom} from "../../apis/service/talk";

const ChatRoomCreationForm = ({
                                  close,
                                  refetchChatRooms,
                                  subscribeChatRoom,
                                  handleChangeChatRoom
                              }) => {

    const [chatRoomName, setChatRoomName] = useState("");

    const handleChange = (e) => {
        if (e.target.value.length > 10) return;
        setChatRoomName(e.target.value);
    };

    const {mutate: createChatRoomMutation} = useMutation({
        mutationFn: createChatRoom,
        onSuccess: (data) => {
            close();
            refetchChatRooms();
            handleChangeChatRoom(data);
            subscribeChatRoom(data);
        }
    });

    const handleCreateSubmit = () => {
        if (chatRoomName.trim() === "") {
            alert("채팅방 이름을 입력해주세요.");
            return;
        }
        createChatRoomMutation(chatRoomName);
    }


    return (
        <Container>
            <Text bold>채팅방 개설</Text>
            <Text size="medium">채팅방 이름을 입력해주세요.</Text>
            <ChatRoomNameInput type="text"
                               name="chatRoomName"
                               value={chatRoomName}
                               onChange={handleChange}
                               autoComplete={"off"}
            />
            <ChatRoomNameCounter>
                {chatRoomName.length}/10자
            </ChatRoomNameCounter>
            <div>
                <CreationButton onClick={handleCreateSubmit}>개설</CreationButton>
                <CancelButton onClick={close}>취소</CancelButton>
            </div>
        </Container>
    );
};

export default ChatRoomCreationForm;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 20px;
    gap: 12px;
`;

const ChatRoomNameInput = styled.input`
    width: 100%;
    height: 40px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;

    &:focus {
        border: 1px solid ${COLOR.BLUE};
    }
`;

const ChatRoomNameCounter = styled.div`
    margin-left: auto;
    font-size: 14px;
    color: #868e96;
`;

const StyledButton = styled.button`
    width: 80px;
    height: 35px;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin: 0 5px;
`;

const CreationButton = styled(StyledButton)`
    background-color: ${COLOR.BLUE};
`;

const CancelButton = styled(StyledButton)`
    background-color: ${COLOR.GRAY_200};
`;