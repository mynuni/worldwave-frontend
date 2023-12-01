import React, {useState} from 'react';
import Text from "../common/Text/Text";
import {Autocomplete, Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {COUNTRIES} from "../../constants/country";
import Button from "../common/Button/Button";
import {sendButtonStyle} from "./SignUpForm";
import {signUp} from "../../apis/service/auth";
import {useNavigate} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";
import useValidation from "../../hooks/useValidation";

const InfoStep = ({formData, setFormData, onChange, onBlur}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {validatePassword, passwordError, passwordConfirmError} = useValidation();
    const navigate = useNavigate();

    const handleCountryOptionChange = (e, newValue) => {
        const country = newValue ? newValue.code : null;
        setFormData({...formData, country: country});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const isValid = validatePassword(formData.password, formData.passwordConfirm);
        if (isValid) {
            try {
                await signUp(formData);
                alert("회원 가입이 완료되었습니다.");
                navigate(CLIENT_PATHS.LOGIN);
            } catch (error) {
                alert(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        }

        setIsLoading(false);
    }

    const handleBlur = () => {
        validatePassword(formData.password, formData.passwordConfirm);
    }

    return (
        <>
            <Text size="small">추가 정보를 입력해주세요.</Text>
            <TextField label="이름 또는 별명"
                       name="nickname"
                       onChange={onChange}
                       fullWidth
                       disabled={isLoading}/>
            <TextField type="password"
                       label="비밀번호"
                       name="password"
                       placeholder="영문, 숫자 조합 8자 이상"
                       onChange={onChange}
                       onBlur={handleBlur}
                       fullWidth
                       disabled={isLoading}
                       error={!!passwordError}
                       helperText={passwordError}/>
            <TextField type="password"
                       label="비밀번호 확인"
                       name="passwordConfirm"
                       placeholder="비밀번호를 한번 더 입력해주세요."
                       onChange={onChange}
                       onBlur={handleBlur}
                       fullWidth
                       disabled={isLoading}
                       error={!!passwordConfirmError}
                       helperText={passwordConfirmError}/>
            <Box sx={{ width: "100%" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">성별</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="gender"
                        value={formData.gender}
                        label="성별"
                        fullWidth
                        onChange={onChange}
                    >
                        <MenuItem value={"M"}>남성</MenuItem>
                        <MenuItem value={"F"}>여성</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ width: "100%" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">나이</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="ageRange"
                        value={formData.ageRange}
                        label="나이"
                        fullWidth
                        onChange={onChange}
                    >
                        <MenuItem value={10}>10대</MenuItem>
                        <MenuItem value={20}>20대</MenuItem>
                        <MenuItem value={30}>30대</MenuItem>
                        <MenuItem value={40}>40대 이상</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Autocomplete
                sx={{width: "100%"}}
                options={COUNTRIES}
                autoHighlight
                onChange={handleCountryOptionChange}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                disabled={isLoading}
                renderOption={(props, option) => (
                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt=""
                        />
                        {option.label}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="국가"
                        inputProps={{
                            ...params.inputProps,
                        }}
                    />
                )}
            />
            <Button onClick={handleSubmit}
                    styles={sendButtonStyle}>{isLoading ?
                <CircularProgress size={25} color="grey"/> : "회원가입 완료"}</Button>
        </>
    );
};

export default InfoStep;