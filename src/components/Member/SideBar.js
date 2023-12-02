import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import {NavLink, useLocation} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";
import {useRecoilValue} from "recoil";
import {userState} from "../../recoil/user";

const SideBar = () => {

    const location = useLocation();
    const [isActive, setIsActive] = useState(false);
    const user = useRecoilValue(userState);

    useEffect(() => {
        const subMenu =
            location.pathname.includes(CLIENT_PATHS.MANAGE_COMMENT) ||
            location.pathname.includes(CLIENT_PATHS.MANAGE_LIKE);
        setIsActive(subMenu);
    }, [location.pathname]);

    return (
        <Container>
            <NavLink to={CLIENT_PATHS.MYPAGE_HOME} exact={true}>
                마이 홈
            </NavLink>
            <NavLink to={CLIENT_PATHS.MYPAGE_MODIFY}>정보 수정</NavLink>
            <NavLink to={CLIENT_PATHS.MANAGE_LIKE} className={isActive ? "active" : ""}>게시글 관리</NavLink>
            {isActive && (
                <SubMenu>
                    <NavLink to={CLIENT_PATHS.MANAGE_LIKE}>나의 좋아요</NavLink>
                    <NavLink to={CLIENT_PATHS.MANAGE_COMMENT}>내가 쓴 댓글</NavLink>
                    <NavLink to={CLIENT_PATHS.MEMBER + user.id}>나의 피드</NavLink>
                </SubMenu>
            )}
            <NavLink to={CLIENT_PATHS.MYPAGE_WITHDRAW}>회원 탈퇴</NavLink>
        </Container>
    );
};

export default SideBar;


const Container = styled.div`
  padding-top: 60px;
  width: 200px;
  height: 100%;
  display: flex;
  border-right: 1px solid ${COLOR.GRAY_200};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: bold;

  a {
    padding: 10px;
    margin: 4px 0;
    text-decoration: none;
    color: ${COLOR.GRAY_300};

    &:hover {
      color: ${COLOR.BLUE};
    }

    &.active {
      color: ${COLOR.BLUE};
      font-weight: bold;
    }
  }
  
`;

const SubMenu = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;

  a {
    padding: 4px 6px;
    font-weight: normal;
  }
`;