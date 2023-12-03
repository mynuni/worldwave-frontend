import React from 'react';
import styled from "styled-components";
import Text from "../Text/Text";
import COLOR from "../../../constants/color";
import useTimeConvert from "../../../hooks/useTimeConvert";
import useModal from "../../../hooks/useModal";
import MemberDetailModal from "../../Member/MemberDetailModal";
import {useMutation} from "react-query";
import {readActivity, readAllActivities} from "../../../apis/service/member";

const NotificationItem = ({activity, refetch}) => {

    const time = useTimeConvert(activity.createdAt);
    const {Modal, open, isOpen, close} = useModal();

    const {
        id,
        activityType,
        actionMemberId,
        actionMemberNickname,
        actionMemberProfileImage,
        read,
        createdAt
    } = activity;

    const {mutate: readActivityMutation} = useMutation({
        mutationFn: readActivity,
        onSuccess: () => {
            refetch();
        }
    });

    return (
        <Container read={read} onClick={() => {
            open();
            readActivityMutation(id);
        }}>
            <ProfileImageWrap>
                <img src={"/images/" + actionMemberProfileImage} alt="profile"/>
            </ProfileImageWrap>
            {activityType === "FOLLOW" && (
                <Text size={"small"}>{actionMemberNickname}님이 회원님을 팔로우합니다.</Text>
            )}
            {activityType === "COMMENT" && (
                <Text size={"small"}>{actionMemberNickname}님이 댓글을 달았습니다.</Text>
            )}
            {activityType === "LIKE" && (
                <Text size={"small"}>{actionMemberNickname}님이 게시글을 좋아합니다.</Text>
            )}
            <NotificationTime>
                <Text styles={{fontSize: "12px"}}>{time}</Text>
            </NotificationTime>
            {activityType === "FOLLOW" && (
                <MemberDetailModal open={isOpen} handleClose={close} memberId={actionMemberId}/>
            )}
        </Container>
    );
};

export default NotificationItem;

const Container = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  gap: 10px;
  background-color: ${({read}) => read ? COLOR.WHITE : "#edf5fa"};

  &:hover {
    background-color: lightgray;
  }

`;

const ProfileImageWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  border: 1px solid ${COLOR.GRAY_200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`;

const NotificationTime = styled.div`
  margin-left: auto;
`;