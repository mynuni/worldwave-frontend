import React from 'react';

const FollowItem = ({data}) => {
    return (
        <div>
            <div>{data?.nickname}</div>
        </div>
    );
};

export default FollowItem;