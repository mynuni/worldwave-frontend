import React, {useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import useFollow from "../../hooks/query/useFollow";
import useModal from "../../hooks/useModal";
import FollowItem from "./FollowItem";

const FollowList = ({memberId, followerCount, followingCount}) => {
    const {followers, followings, refetchFollowers, refetchFollowings} = useFollow(memberId);
    const {Modal, open, isOpen, close} = useModal();
    const [currentAction, setCurrentAction] = useState(null);

    const handleClickFollowers = () => {
        refetchFollowers();
        setCurrentAction('followers');
        open();
    };

    const handleClickFollowings = () => {
        refetchFollowings();
        setCurrentAction('followings');
        open();
    };

    return (
        <div style={{display: 'flex', marginTop: '12px'}}>
            <FollowWrap onClick={handleClickFollowers}>
                <div>팔로워</div>
                <div>{followerCount}</div>
            </FollowWrap>
            <FollowWrap onClick={handleClickFollowings}>
                <div>팔로잉</div>
                <div>{followingCount}</div>
            </FollowWrap>

            <Modal isOpen={isOpen} close={close}>
                {currentAction === 'followers' && (
                    followers?.content?.map(follower => (
                        <FollowItem data={follower} onClose={close}/>
                    ))
                )}
                {currentAction === 'followings' && (
                    followings?.content?.map(following => (
                        <FollowItem data={following} onClose={close}/>
                    ))
                )}
            </Modal>
        </div>
    );
};

export default FollowList;

const FollowWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 80px;
  height: 60px;
  border: 1px solid ${COLOR.GRAY_200};
  border-radius: 6px;
  margin: 0 10px;

  div:last-child {
    font-weight: bold;
  }
`;