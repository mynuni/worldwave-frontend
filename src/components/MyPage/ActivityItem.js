import React from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import Text from "../common/Text/Text";
import useTimeConvert from "../../hooks/useTimeConvert";
import {useNavigate} from "react-router-dom";
import useModal from "../../hooks/useModal";
import {useMutation, useQuery} from "react-query";
import {getPost} from "../../apis/service/feed";
import PostCard from "../Feed/PostCard";
import {readActivity} from "../../apis/service/member";

const ActivityItem = ({
                          activityId,
                          targetId,
                          activityType,
                          actionMemberId,
                          actionMemberNickname,
                          actionMemberProfileImage,
                          read,
                          createdAt,
                          refetchNotification
                      }) => {

    const defaultProfileImage = "default-profile-image.png";
    const navigate = useNavigate();
    const {Modal, open, close, isOpen} = useModal();

    const handleClick = () => {
        if (activityType === "FOLLOW") {
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

    const {mutate: readActivityMutation} = useMutation({
        mutationFn: readActivity,
        onSuccess: () => {
            refetchNotification();
        }
    });

    return (
        <ActivityWrapper read={read} onClick={handleClick}>
            <ProfileImageWrapper>
                <img
                    src={process.env.REACT_APP_STATIC_IMAGES_BASE_URL + (actionMemberProfileImage || defaultProfileImage)}
                    alt=""
                />
            </ProfileImageWrapper>
            {activityType === "FOLLOW" && (
                <Text size={"small"}><b>{actionMemberNickname}</b>님이 회원님을 팔로우합니다.</Text>
            )}
            {activityType === "COMMENT" && (
                <Text size={"small"}><b>{actionMemberNickname}</b>님이 회원님의 게시글에 댓글을 달았습니다.</Text>
            )}
            {activityType === "LIKE" && (
                <Text size={"small"}><b>{actionMemberNickname}</b>님이 회원님의 게시글을 좋아합니다.</Text>
            )}
            <NotificationTime>
                <Text styles={{fontSize: "12px"}}>{useTimeConvert(createdAt)}</Text>
            </NotificationTime>
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
        </ActivityWrapper>
    );
};

export default ActivityItem;

const ActivityWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${COLOR.GRAY_100};
  cursor: pointer;
  background-color: ${({read}) => read ? COLOR.WHITE : "#EDF5FA"};

  &:hover {
    background-color: #EEE;
  }

  &:last-child {
    border-bottom: none;
  }

`;

const ProfileImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
  }
`;

const NotificationTime = styled.div`
  margin-left: auto;

`;