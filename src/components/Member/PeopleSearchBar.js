import React, {useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import {Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import Text from "../common/Text/Text";
import CountryDropdown from "../common/Dropdown/CountryDropdown";
import {CiSearch} from "react-icons/ci";
import {FaRegKeyboard} from "react-icons/fa";

const PeopleSearchBar = ({searchParams, handleOptionChange}) => {

    const [typingTimeout, setTypingTimeout] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    const handleChangeNickname = (e) => {
        const {name, value} = e.target;
        clearTimeout(typingTimeout);
        const newTimeout = setTimeout(() => {
            handleOptionChange(name, value);
            setIsTyping(false);
        }, 1000);

        setTypingTimeout(newTimeout);
        setIsTyping(true);
    };

    return (
        <Container>
            <Text size="large"
                  styles={{textAlign: "center", paddingTop: "6px"}}>친구 찾기</Text>
            <Text size="medium"
                  styles={{textAlign: "center", paddingBottom: "6px"}}>친구를 찾고 소식을 구독해보세요.</Text>

            {/*나이*/}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">나이</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="ageRange"
                    value={searchParams.ageRange}
                    label="나이"
                    onChange={(e) => handleOptionChange(e.target.name, e.target.value)}
                >
                    <MenuItem value={null}>전체</MenuItem>
                    <MenuItem value={10}>10대</MenuItem>
                    <MenuItem value={20}>20대</MenuItem>
                    <MenuItem value={30}>30대</MenuItem>
                    <MenuItem value={40}>40대 이상</MenuItem>
                </Select>
            </FormControl>

            {/*성별*/}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">성별</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="gender"
                    value={searchParams.gender}
                    label="성별"
                    onChange={(e) => handleOptionChange(e.target.name, e.target.value)}
                >
                    <MenuItem value={null} selected>전체</MenuItem>
                    <MenuItem value={"M"}>남성</MenuItem>
                    <MenuItem value={"F"}>여성</MenuItem>
                </Select>
            </FormControl>
            <CountryDropdown searchParams={searchParams} handleOptionChange={handleOptionChange}/>

            {/*이름 검색*/}
            <FormControl variant="outlined">
                <InputLabel htmlFor="search-nickname">이름 또는 닉네임</InputLabel>
                <OutlinedInput
                    id="search-nickname"
                    endAdornment={<div style={{fontSize: "20px"}}>{isTyping ?
                        <FaRegKeyboard/> : <CiSearch/>
                    }</div>}
                    name="nickname"
                    onChange={handleChangeNickname}
                    label="이름 또는 닉네임"
                    fullWidth
                />
            </FormControl>

            {/*팔로우 제외 체크박스*/}
            <FormControlLabel label="팔로우 중인 사람을 제외합니다."
                              control={
                                  <Checkbox checked={searchParams.hideFollowers}
                                            name="hideFollowers"
                                            value={searchParams.hideFollowers}
                                            onChange={(e) => handleOptionChange(e.target.name, e.target.checked)}
                                  />}
            />
        </Container>
    );
};

export default PeopleSearchBar;

const Container = styled.div`
  width: 300px;
  min-width: 300px;
  height: 430px;
  border: 1px solid ${COLOR.GRAY_300};
  background-color: white;
  margin-top: 20px;
  margin-right: 10px;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;