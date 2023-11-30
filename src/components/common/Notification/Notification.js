import React, {useEffect, useState} from 'react';
import useDropdown from "../../../hooks/useDropdown";
import ActivityDropdown from "../Dropdown/ActivityDropdown";
import styled from "styled-components";
import {IoNotificationsOutline} from "react-icons/io5";
import {Tooltip} from "@mui/material";
import {useRecoilValue} from "recoil";
import {userState} from "../../../recoil/user";
import {LuDot} from "react-icons/lu";
import { MdOutlineFiberNew } from "react-icons/md";


const Notification = () => {
    const user = useRecoilValue(userState);
    const {isOpen, dropdownRef, toggleDropdown} = useDropdown();
    const [notification, setNotification] = useState("");
    const [hasNewNotification, setHasNewNotification] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:8080/api/notifications/subscribe/${user.id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY)}`,
            },
            withCredentials: true,
        });

        const handleNotification = (e) => {
            setNotification(e.data);
            setHasNewNotification(true);

            setTimeout(() => {
                setNotification("");
            }, 1500);

        };

        eventSource.addEventListener("notification", handleNotification);

        return () => {
            eventSource.removeEventListener("notification", handleNotification);
            eventSource.close();
        };
    }, [user.id]);


    return (
        <Container ref={dropdownRef}>
            <Tooltip title={notification} arrow open={!!notification}>
                {hasNewNotification && (
                    <MdOutlineFiberNew style={{color: "red", fontSize: "30px", position: "absolute", top: "-10", left: "18"}} />
                )}
                <NotificationIcon onClick={() => {toggleDropdown(); setHasNewNotification(false)}}/>
                {isOpen && (<ActivityDropdown/>)}
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