import React, {useEffect, useState} from 'react';

const UseTimeConvert = (time) => {

    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        const targetDate = new Date(time);
        const currentDate = new Date();
        const timeDiff = currentDate - targetDate;
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) {
            setTimeAgo("방금 전");
        } else if (minutes <= 60) {
            setTimeAgo(`${minutes}분 전`);
        } else if (hours <= 24) {
            setTimeAgo(`${hours}시간 전`);
        } else if (days <= 30) {
            setTimeAgo(`${days}일 전`);
        } else if (months <= 12) {
            setTimeAgo(`${months}개월 전`);
        } else {
            setTimeAgo(`${years}년 전`);
        }
    }, [timeAgo]);

    return timeAgo;
};

export default UseTimeConvert;