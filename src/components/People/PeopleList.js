import React from 'react';
import styled from "styled-components";
import MemberCard from "./MemberCard";
import {Pagination} from "@mui/material";
import useMemberSearch from "../../hooks/query/useMemberSearch";
import Text from "../common/Text/Text";

const PeopleList = ({searchParams, handlePageChange}) => {

    const {data} = useMemberSearch(searchParams);

    return (
        <Container>
            <MemberCardContainer>
                {data?.content.length === 0 &&
                    <div>
                        <Text size="large" styles={{textAlign: "center"}}>검색 결과가 없습니다.</Text>
                    </div>}
                {data?.content.map((member) => (
                    <MemberCardWrap key={member.id}>
                        <MemberCard memberId={member.id}
                                    nickname={member.nickname}
                                    country={member.country}
                                    gender={member.gender}
                                    ageRange={member.ageRange}
                                    profileImage={member.profileImage}
                                    followed={member.followed}/>
                    </MemberCardWrap>
                ))}
            </MemberCardContainer>
            {}
            {data?.content.length > 0 &&
                <Pagination
                    count={data?.totalPages}
                    page={data?.number + 1}
                    onChange={(e, page) => handlePageChange(page)}
                />}
        </Container>
    );
};

export default PeopleList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberCardContainer = styled.div`
  display: flex;
  width: 800px;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  flex-wrap: wrap;
`;

const MemberCardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;

`;

