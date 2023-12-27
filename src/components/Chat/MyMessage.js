import React from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";

const MyMessage = ({content}) => {
    return (
        <Container>{content}</Container>
    );
};

export default MyMessage;

const Container = styled.div`
    max-width: 40%;
    overflow-wrap: break-word;
    padding: 10px;
    margin: 5px;
    border-radius: 8px;
    align-self: flex-end;
    background-color: ${COLOR.BLUE};
    color: ${COLOR.WHITE};
`;