import React, {useState} from 'react';
import FeedSearchBar from "../../components/Feed/FeedSearchBar";
import styled from "styled-components";
import FeedContainer from "../../components/Feed/FeedContainer";

const FeedPage = () => {

    const [sort, setSort] = useState("createdAt");

    return (
        <PageLayout>
            <FeedSearchBar sort={sort} setSort={setSort}/>
            <FeedContainer sort={sort}/>
        </PageLayout>
    );
};

export default FeedPage;

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
