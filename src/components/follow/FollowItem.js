import React from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import Text from "../common/Text/Text";
import Button from "../common/Button/Button";
import {useRecoilValue} from "recoil";
import {userState} from "../../recoil/user";
import {useNavigate} from "react-router-dom";

const FollowItem = ({memberId, profileImage, nickname, country, followed, handleToggleFollow, close}) => {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    const handleLink = () => {
        navigate(`/members/${memberId}`);
        close();
    }

    return (
        <Container>
            <ProfileImageWrap onClick={handleLink}>
                <ProfileImage src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + profileImage}/>
            </ProfileImageWrap>
            <Text bold
                  onClick={handleLink}
                  size={"medium"}
                  styles={{cursor: "pointer"}}>{nickname}
            </Text>
            {user.id !== memberId &&
                <FollowButton onClick={() => handleToggleFollow(memberId)}
                              followed={followed}>{followed ? "팔로우 취소" : "팔로우"}
                </FollowButton>}

        </Container>
    );
};

export default FollowItem;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;

  &:hover {
    background-color: ${COLOR.GRAY_100};
  }
`;

const ProfileImageWrap = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const FollowButton = styled(Button)`
  width: 100px;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  margin-left: auto;
  background-color: ${props => props.followed ? COLOR.GRAY_300 : COLOR.BLUE};
  color: ${props => props.followed ? COLOR.WHITE : COLOR.WHITE};
`;