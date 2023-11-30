import React from 'react';
import {IoNotificationsOutline} from "react-icons/io5";
import styled from "styled-components";

const NotificationIcon = ({handleNotificationIconClick}) => {
    return (
        <IconWrap onClick={handleNotificationIconClick}>
            <StyledNotificationIcon/>
        </IconWrap>
    );
};

export default NotificationIcon;

const IconWrap = styled.div`

`;

const StyledNotificationIcon = styled(IoNotificationsOutline)`
  cursor: pointer;
`;