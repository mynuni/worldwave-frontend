import React from 'react';
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";
import Text from "../common/Text/Text";
import COLOR from "../../constants/color";
import {NavLink} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";
import {CrownIcon} from "./ChatRoomItem";

const ParticipantItem = ({id, nickname, profileImage, creatorId}) => {

    const user = useRecoilValue(userSelector);
    const isMyProfile = user.id === id;

    return (
        <Container>
            <ImageWrap>
                <img src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + profileImage} alt="profile"/>
            </ImageWrap>
            <Text styles={{marginRight: "4px"}}>{nickname}</Text>
            {creatorId === id && <CrownIcon/>}
            {isMyProfile && <span>(나)</span>}
            <ProfileButton to={CLIENT_PATHS.MEMBER + id}>프로필</ProfileButton>
        </Container>
    );
};

export default ParticipantItem;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 10px;
    
    span {
        margin-left: 4px;
        color: ${COLOR.GRAY_400};
    }
    
    &:hover {
        background-color: ${COLOR.GRAY_100};
        
        & > a {
            display: block;
        }
        
    }
`;

const ProfileButton = styled(NavLink)`
    display: none;
    margin-left: auto;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    background-color: ${COLOR.BLUE};
    color: ${COLOR.WHITE};
`;

const ImageWrap = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;