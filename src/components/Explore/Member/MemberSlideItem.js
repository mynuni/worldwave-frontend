import React from 'react';
import styled from "styled-components";
import Text from "../../common/Text/Text";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../../constants/path";

const MemberSlideItem = ({
                             id,
                             nickname,
                             profileImage,
                             followed,
                         }) => {

    const navigate = useNavigate();

    return (
        <Wrapper onClick={() => navigate(`${CLIENT_PATHS.MEMBER}${id}`)}>
            <ProfileImage src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + profileImage}/>
            <Text bold size={"small"}>{nickname}</Text>
        </Wrapper>
    );
};

export default MemberSlideItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
