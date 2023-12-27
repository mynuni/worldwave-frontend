import React from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";

const NoticeMessage = ({nickname, chatMessageType}) => {
    return (
        <Container>
            <div>{nickname}님이 {(chatMessageType === "ENTER") ? "입장" : "퇴장"}하셨습니다.</div>
        </Container>
    );
};

export default NoticeMessage;

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px 0;
    color: ${COLOR.BLACK_100};
    font-size: 14px;
        
    div {
        padding: 5px 10px;
        border-radius: 5px;
        background-color: ${COLOR.GRAY_100};
    }
`;