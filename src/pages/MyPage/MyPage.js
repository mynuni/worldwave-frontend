import React from 'react';
import SideBar from "../../components/Member/SideBar";
import {Container} from "./MyPage.styles";
import Section from "../../components/Member/Section";
import {useParams} from "react-router-dom";
import WithdrawForm from "../../components/MyPage/WithdrawForm";

const MyPage = () => {

    const { page } = useParams();

    return (
        <Container>
            <SideBar/>
            <Section page={page}/>
        </Container>
    );
};

export default MyPage;
