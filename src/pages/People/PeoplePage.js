import React, {useState} from 'react';
import PeopleList from "../../components/People/PeopleList";
import PeopleSearchBar from "../../components/Member/PeopleSearchBar";
import {Container} from "./PeoplePage.styles";

const PeoplePage = () => {

    const [searchParams, setSearchParams] = useState({
        page: 0,
        ageRange: null,
        gender: null,
        country: null,
        nickname: null,
        hideFollowers: null,
    });

    const handleOptionChange = (name, value) => {
        setSearchParams({
            ...searchParams,
            [name]: value,
            page: 0,
        });
    };

    const handlePageChange = (page) => {
        setSearchParams({
            ...searchParams,
            page: page - 1,
        });
    };

    return (
        <Container>
            <PeopleSearchBar searchParams={searchParams}
                             setSearchParams={setSearchParams}
                             handleOptionChange={handleOptionChange}/>
            <PeopleList searchParams={searchParams}
                        handleOptionChange={handleOptionChange}
                        handlePageChange={handlePageChange}/>
        </Container>
    );
};

export default PeoplePage;