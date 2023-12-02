import React from 'react';
import WithdrawForm from "../MyPage/WithdrawForm";
import MyPageHome from "../MyPage/MyPageHome";
import AccountModifyForm from "../MyPage/AccountModifyForm";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";
import MyComment from "../MyPage/MyComment";
import MyLike from "../MyPage/MyLike";

const Section = ({page}) => {

    const navigate = useNavigate();

    switch (page) {
        case "home":
            return <MyPageHome/>
        case 'modify':
            return <AccountModifyForm/>
        case 'withdraw':
            return <WithdrawForm/>
        case 'comment':
            return <MyComment/>
        case 'like':
            return <MyLike/>
        default:
            navigate(CLIENT_PATHS.MYPAGE_HOME);
            return null;
    }

};

export default Section;
