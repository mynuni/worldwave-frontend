import React from 'react';
import styled from "styled-components";
import Text from "../Text/Text";
import COLOR from "../../../constants/color";
import useTimeConvert from "../../../hooks/useTimeConvert";
import useModal from "../../../hooks/useModal";
import MemberDetailModal from "../../Member/MemberDetailModal";
import {useMutation, useQuery} from "react-query";
import {readActivity} from "../../../apis/service/member";
import PostCard from "../../Feed/PostCard";
import {getPost} from "../../../apis/service/feed";
import {useNavigate} from "react-router-dom";

const NotificationItem = ({activity, close: closeDropdown, refetch}) => {

    const time = useTimeConvert(activity.createdAt);
    const {Modal, open, isOpen, close} = useModal();
    const navigate = useNavigate();

    const {
        id: activityId,
        targetId,
        activityType,
        actionMemberId,
        actionMemberNickname,
        actionMemberProfileImage,
        read,
    } = activity;

    const {mutate: readActivityMutation} = useMutation({
        mutationFn: readActivity,
        onSuccess: () => {
            refetch();
        }
    });

    const handleClick = () => {
        if (activityType === "FOLLOW") {
            closeDropdown();
            navigate(`/members/${actionMemberId}`);
        } else if (activityType === "COMMENT" || activityType === "LIKE") {
            refetchPost().then(() => {
                open();
            }).catch((error) => {
                alert(error.response.data.message);
            });
        }

        if (!read) {
            readActivityMutation(activityId);
        }
    }

    const {data: targetPost, refetch: refetchPost} = useQuery({
        queryKey: ["post", targetId],
        queryFn: () => getPost(targetId),
        enabled: false
    });

    return (
        <Container read={read} onClick={() => {
            handleClick();
            readActivityMutation(activityId);
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
            <Modal open={isOpen} handleClose={close}>
                {targetPost && <PostCard
                    id={targetPost.id}
                    authorId={targetPost.authorId}
                    authorNickname={targetPost.authorNickname}
                    profileImage={targetPost.profileImage}
                    content={targetPost.content}
                    attachedFiles={targetPost.attachedFiles}
                    likeCount={targetPost.likeCount}
                    commentCount={targetPost.commentCount}
                    liked={targetPost.liked}
                    createdAt={targetPost.createdAt}
                />}
            </Modal>
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