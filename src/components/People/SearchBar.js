import React from 'react';
import styled from "styled-components";

const country = [
    {value: 'option1', label: '옵션 1'},
    {value: 'option2', label: '옵션 2'},
    {value: 'option3', label: '옵션 3'},
];

const age = [
    {value: 'option1', label: '옵션 1'},
    {value: 'option2', label: '옵션 2'},
    {value: 'option3', label: '옵션 3'},
];

const gender = [
    {value: 'option1', label: '옵션 1'},
    {value: 'option2', label: '옵션 2'},
    {value: 'option3', label: '옵션 3'},
];

const SearchBar = () => {

    return (
        <Container>
        </Container>
    );
};

export default SearchBar;

const Container = styled.div`
  width: 100%;
  height: 60px;
`;