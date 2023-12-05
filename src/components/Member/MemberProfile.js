import React, {useState} from 'react';
import {useMutation, useQuery} from "react-query";
import {getMemberDetail, toggleFollow} from "../../apis/service/member";
import styled from "styled-components";
import Text from "../common/Text/Text";
import Button from "../common/Button/Button";
import COLOR from "../../constants/color";
import Flag from "../common/Flag/Flag";
import {useRecoilValue} from "recoil";
import {userState} from "../../recoil/user";
import useModal from "../../hooks/useModal";
import FollowList from "../Follow/FollowList";
import useFollow from "../../hooks/query/useFollow";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";
import {getKoreanLabel, useGenderConvert} from "../../hooks/useProfileConvert";

const MemberProfile = ({memberId, children}) => {

    const user = useRecoilValue(userState);
    const navigate = useNavigate();

    const {data: memberProfile, refetch} = useQuery({
        queryKey: ["getMemberDetail", memberId],
        queryFn: () => getMemberDetail(memberId)
    });

    const {mutate: toggleFollowMutation} = useMutation({
        mutationFn: toggleFollow,
        onSuccess: () => {
            refetch();
        }
    });

    const handleToggleFollow = (id) => {
        toggleFollowMutation(id);
    };

    const {Modal, isOpen, open, close} = useModal();
    const {followers, followings, refetchFollowers, refetchFollowings} = useFollow(memberId);
    const [followType, setFollowType] = useState("");

    const convertedCountry = getKoreanLabel(memberProfile?.country);
    const convertedGender = useGenderConvert(memberProfile?.gender);

    return (
        <div>
            {memberProfile &&
                <MemberProfileContainer>
                    <ProfileImageWrap>
                        <ProfileImage src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + memberProfile.profileImage}/>
                    </ProfileImageWrap>
                    <ProfileDetailsContainer>
                        <NicknameWrap>
                            <Text size={"large"} bold>{memberProfile.nickname}</Text>
                            <Flag country={memberProfile.country} width={40}
                                  style={{paddingBottom: "4px", marginLeft: "10px"}}/>
                        </NicknameWrap>
                        <AdditionalInfoContainer>
                            <Text size={"medium"}>{convertedCountry}</Text>
                            <Text size={"small"}>|</Text>
                            <Text
                                size={"medium"}>{memberProfile.ageRange ? memberProfile.ageRange + "대" : "나이 비공개"}</Text>
                            <Text size={"small"}>|</Text>
                            <Text size={"medium"}>{convertedGender}</Text>
                        </AdditionalInfoContainer>
                        <FollowContainer>
                            <FollowWrap onClick={
                                () => {
                                    refetchFollowers();
                                    setFollowType("followers");
                                    open();
                                }
                            }>
                                <Text bold size={"medium"}>팔로우</Text>
                                <Text size={"medium"}>{memberProfile.followerCount}</Text>
                            </FollowWrap>
                            <FollowWrap onClick={
                                () => {
                                    refetchFollowings();
                                    setFollowType("followings");
                                    open();
                                }
                            }>
                                <Text bold size={"medium"}>팔로잉</Text>
                                <Text size={"medium"}>{memberProfile.followingCount}</Text>
                            </FollowWrap>
                        </FollowContainer>
                        <Modal isOpen={isOpen}>
                            <FollowList type={followType}
                                        memberId={memberId}
                                        close={close}
                                        refetch={refetch}
                            />
                        </Modal>
                        <FollowButtonWrap>
                            {Number(memberId) !== user.id ?
                                <FollowButton onClick={() => handleToggleFollow(memberId)}
                                              followed={memberProfile.followed}
                                >
                                    {memberProfile.followed ? "팔로우 취소" : "팔로우"}
                                </FollowButton>
                                :
                                <ButtonContainer>
                                    <Button onClick={() => navigate(CLIENT_PATHS.MYPAGE_MODIFY)} styles={buttonStyle}>정보 수정</Button>
                                </ButtonContainer>}
                        </FollowButtonWrap>
                    </ProfileDetailsContainer>
                </MemberProfileContainer>
            }
        </div>
    );
};

export default MemberProfile;

const MemberProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin-top: 40px;
  gap: 60px;
  padding-bottom: 30px;
  border-bottom: 1px solid ${COLOR.GRAY_100};
`;

const ProfileImageWrap = styled.div`
  width: 180px;
  height: 180px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-position: center;
`;

const ProfileDetailsContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const NicknameWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FollowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${COLOR.GRAY_200};
  width: 100%;
`;

const FollowWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  margin-bottom: 10px;
`;

const FollowButtonWrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 0;
`;

const FollowButton = styled(Button)`
  width: 100%;
  height: 100%;
  background-color: ${props => props.followed ? COLOR.GRAY_200 : COLOR.BLUE};
  color: ${props => props.followed ? COLOR.WHITE : COLOR.WHITE};
`;

const AdditionalInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const buttonStyle = {
    width: "100%",
    height: "40px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
    border: `1px solid ${COLOR.GRAY_200}`,
    color: COLOR.BLACK_100,
    backgroundColor: COLOR.WHITE,
    "&:hover": {
        backgroundColor: COLOR.GRAY_100
    }
}