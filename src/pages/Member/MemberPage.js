import React from 'react';
import {useParams} from "react-router-dom";
import MemberProfile from "../../components/Member/MemberProfile";
import MemberFeed from "../../components/Member/MemberFeed";
import styled from "styled-components";

const MemberPage = () => {

    const {memberId} = useParams();

    return (
        <PageLayout>
            <MemberProfile memberId={memberId}/>
            <MemberFeed memberId={memberId}/>
        </PageLayout>
    );
};

export default MemberPage;

const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;
`;