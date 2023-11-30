import React, {useState} from 'react';
import styled from "styled-components";
import Text from "../Text/Text";
import {useCountryNameConvert} from "../../../hooks/useProfileConvert";
import {useRecoilValue} from "recoil";
import {userState} from "../../../recoil/user";
import {useMutation} from "react-query";
import {toggleFollow} from "../../../apis/service/member";

const MemberCard = ({
                        memberId,
                        nickname,
                        country,
                        gender,
                        ageRange,
                        followerCount,
                        followingCount,
                        profileImage,
                        followed,
                        refetch,
                    }) => {

    const countryLabel = useCountryNameConvert(country);
    const user = useRecoilValue(userState);

    const {mutate: toggleFollowMutation} = useMutation({
        mutationKey: ["toggleFollow", memberId],
        mutationFn: toggleFollow,
        onSuccess: () => {
            refetch();
        },
    });

    const handleToggleFollow = () => {
        toggleFollowMutation(memberId);
    };

    return (
        <Container>
            <ProfilePictureWrap>
                <img src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + profileImage} alt={""}/>
            </ProfilePictureWrap>
            <Text bold>{nickname}</Text>
            <Text>{countryLabel}</Text>
            <Text>{gender}</Text>
            <Text>{ageRange}</Text>
            {user.id !== memberId &&
                <FollowButton onClick={handleToggleFollow}
                              $isfollowed={followed}>{followed ? "팔로우 취소" : "팔로우"}
                </FollowButton>}
        </Container>
    );
};

export default MemberCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  gap: 5px;
`;

const ProfilePictureWrap = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const FollowButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 6px;
  background-color: ${props => props.$isfollowed ? "#f0f0f0" : "#3897f0"};
  color: ${props => props.$isfollowed ? "#262626" : "white"};
  border: 1px solid #dbdbdb;
  cursor: pointer;
  margin-top: 10px;
`;