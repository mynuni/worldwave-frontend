import React, {useEffect, useState} from 'react';
import useDropdown from "../../../hooks/useDropdown";
import ActivityDropdown from "../Dropdown/ActivityDropdown";
import styled from "styled-components";
import {IoNotificationsOutline} from "react-icons/io5";
import {Tooltip} from "@mui/material";
import {useRecoilValue} from "recoil";
import {userState} from "../../../recoil/user";
import {MdOutlineFiberNew} from "react-icons/md";
import {getUnreadNotificationCount} from "../../../apis/service/member";
import {EventSourcePolyfill} from 'event-source-polyfill';

const Notification = () => {
    const user = useRecoilValue(userState);
    const {isOpen, dropdownRef, toggleDropdown} = useDropdown();
    const [notification, setNotification] = useState("");
    const [hasNewNotification, setHasNewNotification] = useState(false);

    const handleNotification = (e) => {
        setNotification(e.data);
        setHasNewNotification(true);

        setTimeout(() => {
            setNotification("");
        }, 1500);
    };

    useEffect(() => {
        if (!user) return;

        const eventSource = new EventSourcePolyfill(process.env.REACT_APP_NOTIFIER_BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY)}`,
            },
            withCredentials: true,
        });

        eventSource.addEventListener("notification", handleNotification);

        return () => {
            eventSource.close();
        };

    }, [user]);

    useEffect(() => {
        getUnreadNotificationCount()
            .then((response) => {
                setHasNewNotification(response > 0);
                setNotification(response > 0 ? `읽지 않은 ${response}개의 알림이 있습니다.` : "");
                setTimeout(() => {
                    setNotification("");
                }, 1500);
            });
    }, []);

    return (
        <Container ref={dropdownRef}>
            <Tooltip title={notification} arrow open={!!notification}>
                {hasNewNotification && (
                    <MdOutlineFiberNew
                        style={{color: "red", fontSize: "30px", position: "absolute", top: "-10", left: "18"}}/>
                )}
                <NotificationIcon onClick={() => {
                    toggleDropdown();
                    setHasNewNotification(false);
                }}/>
                {isOpen && (<ActivityDropdown close={toggleDropdown}/>)}
            </Tooltip>
        </Container>
    );
};

export default Notification;

const Container = styled.div`
  position: relative;

`;

const NotificationIcon = styled(IoNotificationsOutline)`
  font-size: 24px;
  cursor: pointer;
`;