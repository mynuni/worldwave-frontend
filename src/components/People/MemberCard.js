import React, {useEffect} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import Text from "../common/Text/Text";
import {useMutation, useQueryClient} from "react-query";
import {toggleFollow} from "../../apis/service/member";
import {useCountryNameConvert, useGenderConvert} from "../../hooks/useProfileConvert";
import {useRecoilValue} from "recoil";
import {userSelector, userState} from "../../recoil/user";

const MemberCard = (props) => {

    const {memberId, nickname, country, gender, ageRange, followed, profileImage, successCallback} = props;

    const userState = useRecoilValue(userSelector);
    const queryClient = useQueryClient();
    const countryLabel = useCountryNameConvert(country);
    const genderLabel = useGenderConvert(gender);
    const toggleFollowMutation = useMutation({
        mutationKey: ["toggleFollow", memberId],
        mutationFn: toggleFollow
    });

    const handleToggleFollow = () => {
        toggleFollowMutation.mutate(memberId, {
            onSuccess: () => {
                queryClient.invalidateQueries("searchMembers");
                if (successCallback) successCallback();
            },
            onError: () => {
                alert("팔로우 실패");
            }
        });
    }

    return (
        <Container>
            <ProfileImageWrap>
                <img
                    className={"profile-image"}
                    src={profileImage ? `/images/${profileImage}` : "/images/default-profile-image.png"}
                    alt=""
                />
                <img
                    className="country-flag"
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${country?.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w40/${country?.toLowerCase()}.png`}
                    alt=""
                />
            </ProfileImageWrap>
            <Text bold>{nickname}</Text>
            <Text size={"medium"}>{countryLabel ? countryLabel : "기타 국적"}</Text>
            <Text size={"medium"}>{ageRange ? ageRange + "대" : "나이 비공개"}</Text>
            <Text size={"medium"}>{genderLabel ? genderLabel : "성별 비공개"}</Text>
            {userState.id !== memberId &&
                <FollowButton onClick={handleToggleFollow} $isfollowed={followed}>
                    {followed ? '팔로우 취소' : '팔로우'}
                </FollowButton>}
        </Container>
    );
};

export default MemberCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  height: 310px;
  border-radius: 6px;
  border: 1px solid ${COLOR.GRAY_200};
  padding: 10px 20px;
  gap: 5px;
`;

const FollowButton = styled.button`
  width: 120px;
  height: 35px;
  background-color: ${(props) => (props.$isfollowed ? COLOR.GRAY_300 : COLOR.BLUE)};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
`;

const ProfileImageWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px 0;

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid ${COLOR.GRAY_200};
  }

  .country-flag {
    position: absolute;
    bottom: 0px;
    right: -10px;
    width: 40px;
    height: auto;
    border: 1px solid ${COLOR.GRAY_100};
  }

`;