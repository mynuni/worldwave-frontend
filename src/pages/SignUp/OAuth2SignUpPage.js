import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {Container, PageLayout} from "./SignUpPage.styles";
import Logo from "../../components/common/Logo/Logo";
import Text from "../../components/common/Text/Text";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import CountryDropdown from "../../components/common/Dropdown/CountryDropdown";
import Button from "../../components/common/Button/Button";
import {useMutation} from "react-query";
import {oAuth2SignUp} from "../../apis/service/auth";
import styled from "styled-components";
import COLOR from "../../constants/color";

const OAuth2SignUpPage = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const navigate = useNavigate();

    const initialSignUpData = {
        emailToken: "",
        nickname: "",
        gender: "M",
        ageRange: 10,
        country: ""
    }

    const [signUpData, setSignUpData] = useState(initialSignUpData);

    useEffect(() => {
        const token = searchParam.get("token");
        if (!token && !localStorage.getItem("emailToken")) {
            navigate("/");
        } else {
            token && localStorage.setItem("emailToken", token);
            setSignUpData({...signUpData, emailToken: token});
            setSearchParam();
        }
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSignUpData({...signUpData, [name]: value});
    }

    const handleCountryChange = (country, regionCode) => {
        setSignUpData({...signUpData, country: regionCode});
    }

    const {mutateAsync, isLoading} = useMutation({
        mutationFn: oAuth2SignUp,
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.removeItem("emailToken");
        },
        onError: (error) => {
            alert(error.response.data.message);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setSignUpData({...signUpData, emailToken: localStorage.getItem("emailToken")});
        const isValid = Object.values(signUpData).every((value) => value);
        if (!isValid) {
            alert("모든 항목을 입력해주세요.");
            return;
        }
        mutateAsync(signUpData)
            .then(res => {
                alert("회원가입이 완료되었습니다.");
                window.location.replace("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <PageLayout>
            <Container>
                <Logo/>
                <Text size="large">회원가입</Text>
                <Text size="small">추가 정보를 입력해주세요.</Text>
                <TextField label="이름 또는 별명"
                           name="nickname"
                           onChange={handleInputChange}
                           fullWidth
                           disabled={isLoading}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">성별</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="gender"
                        label="성별"
                        value={signUpData.gender}
                        onChange={handleInputChange}
                        fullWidth
                        disabled={isLoading}
                    >
                        <MenuItem value={"M"}>남성</MenuItem>
                        <MenuItem value={"F"}>여성</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{width: "100%"}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">나이</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="ageRange"
                            label="나이"
                            fullWidth
                            value={signUpData.ageRange}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        >
                            <MenuItem value={10}>10대</MenuItem>
                            <MenuItem value={20}>20대</MenuItem>
                            <MenuItem value={30}>30대</MenuItem>
                            <MenuItem value={40}>40대 이상</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <CountryDropdown handleOptionChange={handleCountryChange} loading={isLoading}/>
                <SignUpButton onClick={handleSubmit}
                              disabled={isLoading}
                              style={{width: "100%", height: "50px"}}>회원가입
                </SignUpButton>
            </Container>
        </PageLayout>
    );
};

export default OAuth2SignUpPage;

const SignUpButton = styled(Button)`
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};

  &:disabled {
    background-color: ${COLOR.GRAY_200};
  }

`;