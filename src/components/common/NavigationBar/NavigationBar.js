import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Logo from "../Logo/Logo";
import {NavLink} from "react-router-dom";
import COLOR from "../../../constants/color";
import {CLIENT_PATHS} from "../../../constants/path";
import useLogoutMutation from "../../../hooks/auth/useLogoutMutation";
import {useRecoilValue} from "recoil";
import {userState} from "../../../recoil/user";
import Notification from "../Notification/Notification";

const NavigationBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const user = useRecoilValue(userState);

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
    }, []);

    const handleMenuClick = () => {
        setIsDropdownOpen(false);
    };

    const {mutate: logout} = useLogoutMutation();

    return (
        <Container>
            <Logo/>
            <NavMenuGroup>
                <NavMenu to={CLIENT_PATHS.EXPLORE}>EXPLORE</NavMenu>
                <NavMenu to={CLIENT_PATHS.FEED}>FEEDS</NavMenu>
                <NavMenu to={CLIENT_PATHS.PEOPLE}>PEOPLE</NavMenu>
                <NavMenu to={CLIENT_PATHS.TALK}>TALK</NavMenu>
                <DropdownContainer ref={dropdownRef}>
                    <DropDownButton
                        src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + user?.profileImgPath}
                        onClick={handleDropdownClick}/>
                    <DropDownMenuGroup isOpen={isDropdownOpen}>
                        <DropdownMenu onClick={handleMenuClick} to={CLIENT_PATHS.MYPAGE_HOME}>내 정보</DropdownMenu>
                        <DropdownMenu onClick={() => window.confirm("로그아웃 하시겠습니까?") && logout()}>로그아웃</DropdownMenu>
                    </DropDownMenuGroup>
                </DropdownContainer>
                <Notification/>
            </NavMenuGroup>
        </Container>
    );
};

export default NavigationBar;

const Container = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${COLOR.GRAY_200};
  height: 60px;
`;

const NavMenuGroup = styled.div`
  display: flex;
  align-items: center;
`;

const NavMenu = styled(NavLink)`
  margin: 0 10px;
  padding: 4px;
  color: ${COLOR.GRAY_400};
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &.active {
    color: ${COLOR.BLUE};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropDownButton = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 10px;
  border-radius: 50%;
  padding: 4px;
  color: ${COLOR.GRAY_400};
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

const DropDownMenuGroup = styled.div`
  width: 100px;
  position: absolute;
  top: 100%;
  left: -30%;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 100;
`;

const DropdownMenu = styled(NavLink)`
  text-align: center;
  display: block;
  margin: 0 10px;
  padding: 8px;
  color: ${COLOR.GRAY_400};
  cursor: pointer;
  font-size: 14px;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.GRAY_200};

  &:hover {
    background-color: ${COLOR.GRAY_200};
  }
`;