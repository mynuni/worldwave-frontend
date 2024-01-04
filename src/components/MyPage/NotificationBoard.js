import React from 'react';
import Text from "../common/Text/Text";
import styled from "styled-components";
import {useMutation, useQuery} from "react-query";
import {getActivities, readAllActivities} from "../../apis/service/member";
import ActivityItem from "./ActivityItem";
import COLOR from "../../constants/color";

const NotificationBoard = ({memberId}) => {
    const {data, refetch: refetchNotification} = useQuery({
        queryKey: ["notifications", memberId],
        queryFn: () => getActivities(memberId)
    });

    const {mutate: readAllActivityMutation} = useMutation({
        mutationFn: readAllActivities,
        onSuccess: () => {
            refetchNotification();
        }
    });

    const isAllRead = data?.every((activity) => activity.read);

    return (
        <Container>
            <Heading>
                <Text bold size={"medium"}>최근 알림</Text>
                <ReadAllButton onClick={() => readAllActivityMutation(memberId)}
                               allread={isAllRead}
                               disabled={isAllRead}>모두 읽음으로 표시</ReadAllButton>
            </Heading>
            <ActivityContainer>
                {data?.map((activity) => (
                    <ActivityItem
                        key={activity.id}
                        activityId={activity.id}
                        targetId={activity.targetId}
                        activityType={activity.activityType}
                        actionMemberId={activity.actionMemberId}
                        actionMemberNickname={activity.actionMemberNickname}
                        actionMemberProfileImage={activity.actionMemberProfileImage}
                        createdAt={activity.createdAt}
                        read={activity.read}
                        refetchNotification={refetchNotification}
                    />
                ))}
                {data?.length === 0 && (
                    <div style={{
                        height: "200px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLOR.GRAY_400
                    }}>
                        최근 알림이 없습니다.
                    </div>
                )}
            </ActivityContainer>

        </Container>
    );
};

export default NotificationBoard;

const Container = styled.div`
    width: 500px;
`;

const ActivityContainer = styled.div`
  width: 100%;
  border: 1px solid ${COLOR.GRAY_200};

  & > div:last-child {
    border-bottom: none;
  }

`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const ReadAllButton = styled.button`
  font-size: 14px;
  color: ${(props) => (props.allread ? COLOR.GRAY_300 : COLOR.BLUE)};
  background-color: transparent;
`;