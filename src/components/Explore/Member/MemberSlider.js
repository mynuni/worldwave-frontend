import React from 'react';
import {useQuery} from "react-query";
import {searchMembers} from "../../../apis/service/member";
import styled from "styled-components";
import {CircularProgress} from "@mui/material";
import COLOR from "../../../constants/color";
import MemberSlideItem from "./MemberSlideItem";

const MemberSlider = ({regionCode}) => {

    const {data, isFetching} = useQuery({
        queryKey: ["getMemberList", regionCode],
        queryFn: () => searchMembers({
            country: regionCode,
            size: 3,
        }),
    });

    if (isFetching) return <Container><CircularProgress/></Container>;

    return (
        <Container>
            {data.content.length === 0 && <div style={{color: COLOR.GRAY_400}}>해당 국가의 사용자가 없습니다.</div>}
            {data.content.map((member) => (
                <MemberSlideItem key={member.id}
                                 id={member.id}
                                 nickname={member.nickname}
                                 profileImage={member.profileImage}
                                 followed={member.followed}
                />
            ))}
        </Container>
    );
};

export default MemberSlider;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;