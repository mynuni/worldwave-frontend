import React from 'react';
import styled from "styled-components";
import NotificationItem from "../Notification/NotificationItem";
import {useMutation, useQuery} from "react-query";
import {getActivities, readAllActivities} from "../../../apis/service/member";
import {useRecoilValue} from "recoil";
import {userState} from "../../../recoil/user";
import Text from "../Text/Text";
import COLOR from "../../../constants/color";

const ActivityDropdown = ({close}) => {

    const user = useRecoilValue(userState);

    const {data: activities, isLoading, isError, refetch} = useQuery({
        queryKey: ["activities", user?.id],
        queryFn: () => getActivities(user.id),
    });

    const {mutate: readAllActivitiesMutation} = useMutation({
        mutationFn: readAllActivities,
        onSuccess: () => {
            refetch();
        }
    });

    return (
        <Container>
            <TextWrap>
                <Text onClick={() => {
                    readAllActivitiesMutation();
                }} size={"small"} styles={{color: COLOR.BLUE}}>모두 읽음으로 표시</Text>
            </TextWrap>
            <ActivityItemContainer>
                {activities?.length === 0 && (
                    <Text size={"small"} styles={{
                        color: COLOR.GRAY_400,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>최근 알림이 없습니다.</Text>
                )}
                {activities?.map((activity) => (
                    <NotificationItem key={activity.id}
                                      refetch={refetch}
                                      close={close}
                                      activity={activity}/>
                ))}
            </ActivityItemContainer>
        </Container>
    );
};

export default ActivityDropdown;

const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 380px;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const ActivityItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
  overflow-y: scroll;
  border-radius: 0 0 6px 6px;
`;

const TextWrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  border-radius: 6px 6px 0 0;
  background-color: ${COLOR.WHITE};

  p {
    cursor: pointer;
  }
`;