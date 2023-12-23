import React from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import Text from "../common/Text/Text";
import {FaUser} from "react-icons/fa";
import {BiSolidCrown} from "react-icons/bi";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";

const ChatRoomItem = ({
                          chatRoomId,
                          creatorId,
                          chatRoomName,
                          participantCount,
                          selectedChatRoom,
                          handleChangeChatRoom
                      }) => {

    const user = useRecoilValue(userSelector);
    const isSelected = selectedChatRoom === chatRoomId;

    return (
        <Container selected={isSelected} onClick={() => handleChangeChatRoom(chatRoomId)}>
            <ContentWrap>
                <TitleWrap>
                    <Text bold>{chatRoomName}</Text>
                </TitleWrap>
                <IconWrap>
                    <ParticipantWrap>
                        <ParticipantIcon/>
                        <Text size={"small"}>{participantCount}</Text>
                    </ParticipantWrap>
                    {user.id === creatorId && (
                        <CrownIcon/>
                    )}
                    <AttendingIcon>참여중</AttendingIcon>
                </IconWrap>
            </ContentWrap>
        </Container>
    );
};

export default ChatRoomItem;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px 14px;
    gap: 8px;
    cursor: pointer;
    border-bottom: 1px solid ${COLOR.GRAY_100};
    background-color: ${props => props?.selected ? COLOR.GRAY_100 : COLOR.WHITE};

    &:hover {
        background-color: ${props => !props?.selected && "#EFEFEF"};
    }
`;

const TitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const IconWrap = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
`;

const ParticipantWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`;

const ParticipantIcon = styled(FaUser)`
    font-size: 12px;
    color: ${COLOR.GRAY_400};
`;

const CrownIcon = styled(BiSolidCrown)`
    font-size: 16px;
    color: orange;
`;

const AttendingIcon = styled.i`
    font-size: 12px;
    font-style: normal;
    color: ${COLOR.BLUE};
    border: 1px solid ${COLOR.BLUE};
    border-radius: 4px;
    padding: 2px 4px;
`;