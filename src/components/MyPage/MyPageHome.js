import React, {useEffect} from 'react';
import {SectionContainer} from "../../pages/MyPage/MyPage.styles";
import styled from "styled-components";
import useMemberDetail from "../../hooks/query/useMemberDetail";
import {useRecoilValue} from "recoil";
import {userState} from "../../recoil/user";
import NotificationBoard from "./NotificationBoard";
import MemberProfile from "../Member/MemberProfile";

const MyPageHome = () => {

    const user = useRecoilValue(userState);
    const {data, fetchMemberDetail, isLoading, isError} = useMemberDetail(user?.id || null);

    useEffect(() => {
        if (user) {
            fetchMemberDetail();
        }
    }, []);

    return (
        <SectionContainer>
            <MemberProfile memberId={user.id}/>
            <Container>
                <NotificationBoard memberId={user.id}/>
            </Container>
        </SectionContainer>
    );
};

export default MyPageHome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;