import React from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import useTimeConvert from "../../hooks/useTimeConvert";
import Text from "../common/Text/Text";

const OthersMessage = ({
                           senderNickname,
                           senderProfileImage,
                           content,
                           createdAt,
                       }) => {

    const time = useTimeConvert(createdAt);

    return (
        <Container>
            <ProfileImageWrap>
                <img src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + senderProfileImage}/>
            </ProfileImageWrap>
            <ContentContainer>
                <Text bold size={"medium"}>{senderNickname}</Text>
                <MessageTextArea size={"medium"}>{content}</MessageTextArea>
                <Text styles={{fontSize: "12px"}}>{time}</Text>
            </ContentContainer>
        </Container>
    );
};

export default OthersMessage;

const Container = styled.div`
    display: flex;
    margin-bottom: 14px;
    width: 100%;
`;

const ProfileImageWrap = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
    
    img {
        width: 100%;
        height: 100%;
    }
    
`;

const ContentContainer = styled.div`
    max-width: 40%;
    overflow-wrap: break-word;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const MessageTextArea = styled.div`
    background-color: ${COLOR.GRAY_100};
    padding: 8px 12px;
    border-radius: 8px;
    word-break: break-all;
`;