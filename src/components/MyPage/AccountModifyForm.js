import React, {useEffect, useRef, useState} from 'react';
import {SectionContainer} from "../../pages/MyPage/MyPage.styles";
import {Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import styled from "styled-components";
import Button from "../common/Button/Button";
import Text from "../common/Text/Text";
import defaultProfileImage from "../../assets/default-profile-image.png";
import COLOR from "../../constants/color";
import useModifyMember from "../../hooks/query/useModifyMember";
import useValidation from "../../hooks/useValidation";
import axios from "axios";
import {userState} from "../../recoil/user";
import {useRecoilState, useRecoilValue} from "recoil";
import CountryDropdown from "../common/Dropdown/CountryDropdown";
import {COUNTRIES} from "../../constants/country";

const AccountModifyForm = () => {

    const [user, setUser] = useRecoilState(userState);
    const {myInfo, changePwMutation, updateInfoMutation} = useModifyMember();

    const initialPasswordChangeData = {
        currentPw: "", newPw: "", newPwConfirm: "",
    };

    const [modifyInfoData, setModifyInfoData] = useState({
        nickname: "",
        ageRange: "",
        gender: "",
        country: "",
    });

    useEffect(() => {
        if (myInfo) {
            setModifyInfoData({
                nickname: myInfo.nickname,
                ageRange: myInfo.ageRange,
                gender: myInfo.gender,
                country: myInfo.country,
            });
        }
    }, [myInfo]);

    const fileInputRef = useRef(null);
    const [newImage, setNewImage] = useState(null);
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && allowedFileTypes.includes(file.type)) {
            const imageUrl = URL.createObjectURL(file);
            setNewImage(imageUrl);
        }
    };

    const handleSubmitProfileImage = async () => {
        const formData = new FormData();
        if (newImage) {
            const file = fileInputRef.current.files[0];
            formData.append("profileImg", file);
        }

        try {
            const response = await axios.put(process.env.REACT_APP_API_BASE_URL + "/members/" + user.id + "/profile-img", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + localStorage.getItem("accessToken")
                    },
                    withCredentials: true
                });
            alert("프로필 사진이 변경되었습니다.");
            setUser({...user, profileImgPath: response.data});
            setNewImage(null);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const {validatePassword, passwordError, passwordConfirmError} = useValidation();
    const [passwordChangeData, setPasswordChangeData] = useState(initialPasswordChangeData);

    const handlePasswordInputChange = (event) => {
        const {name, value} = event.target;
        setPasswordChangeData({
            ...passwordChangeData, [name]: value,
        });
    };

    const handleChangePassword = () => {
        changePwMutation(passwordChangeData, {
            onSuccess: () => {
                alert("비밀번호가 변경되었습니다.");
                setPasswordChangeData(initialPasswordChangeData);
            }, onError: (error) => {
                alert(error.message);
            }
        });
    };

    const handleModifyInfoChange = (e) => {
        const {name, value} = e.target;
        setModifyInfoData({
            ...modifyInfoData, [name]: value,
        });
    }

    const handleUpdateInfo = () => {
        updateInfoMutation({userId: user.id, updateData: modifyInfoData});
    }

    return (<SectionContainer>
        <Text bold>기본 정보</Text>
        {myInfo && <ModifyFormContainer>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
            />
            {newImage ?
                <ProfilePictureContainer>
                    <ProfilePictureWrap>
                        <img src={newImage} alt=""/>
                    </ProfilePictureWrap>
                    <ProfilePictureButton onClick={handleSubmitProfileImage} style={{
                        backgroundColor: COLOR.BLUE, color: COLOR.WHITE
                    }}>변경하기</ProfilePictureButton>
                    <ProfilePictureButton
                        onClick={() => setNewImage(null)}>취소</ProfilePictureButton>
                </ProfilePictureContainer>
                :
                <ProfilePictureContainer>
                    <ProfilePictureWrap>
                        <img
                            src={myInfo.profileImage ? process.env.REACT_APP_STATIC_IMAGES_BASE_URL + myInfo.profileImage : defaultProfileImage}
                            alt=""/>
                    </ProfilePictureWrap>
                    <ProfilePictureButton onClick={() => fileInputRef.current.click()}>사진
                        변경</ProfilePictureButton>
                </ProfilePictureContainer>}
            <FormContainer>
                <TextField label="이메일"
                           type='text'
                           defaultValue={user.email}
                           disabled
                           fullWidth
                           inputProps={{readOnly: true,}}
                />
                <TextField label={"이름"}
                           name="nickname"
                           defaultValue={myInfo.nickname}
                           onBlur={handleModifyInfoChange}
                           fullWidth/>
                <Box sx={{width: "100%"}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">나이</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="ageRange"
                            label="나이"
                            defaultValue={myInfo.ageRange}
                            fullWidth
                            onChange={handleModifyInfoChange}
                        >
                            <MenuItem value={10}>10대</MenuItem>
                            <MenuItem value={20}>20대</MenuItem>
                            <MenuItem value={30}>30대</MenuItem>
                            <MenuItem value={40}>40대 이상</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{width: "100%"}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">성별</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="gender"
                            defaultValue={myInfo.gender}
                            label="성별"
                            fullWidth
                            onChange={handleModifyInfoChange}
                        >
                            <MenuItem value={"M"}>남성</MenuItem>
                            <MenuItem value={"F"}>여성</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Autocomplete
                    sx={{width: "100%"}}
                    options={COUNTRIES}
                    autoHighlight
                    defaultValue={COUNTRIES.find((country) => country.code === myInfo.country)}
                    onChange={(event, value) => {
                        setModifyInfoData({
                            ...modifyInfoData,
                            country: value ? value.code : "KR",
                        });
                    }}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.code === value.code}
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
                <BasicInfoChangeButton onClick={handleUpdateInfo}>수정하기</BasicInfoChangeButton>
            </FormContainer>

        </ModifyFormContainer>}
        {user.registerType === "FORM" &&
            <>
                <hr/>
                <Text bold>비밀번호 변경</Text>
                <ModifyFormContainer>
                    <FormContainer>
                        <TextField label="현재 비밀번호"
                                   name="currentPw"
                                   type="password"
                                   value={passwordChangeData.currentPw}
                                   onChange={handlePasswordInputChange}
                                   fullWidth/>
                        <TextField label="새로운 비밀번호"
                                   name="newPw"
                                   type="password"
                                   value={passwordChangeData.newPw}
                                   onChange={handlePasswordInputChange}
                                   onBlur={() => validatePassword(passwordChangeData.newPw, passwordChangeData.newPwConfirm)}
                                   error={!!passwordError}
                                   helperText={passwordError}
                                   fullWidth/>
                        <TextField label="새로운 비밀번호 확인"
                                   name="newPwConfirm"
                                   type="password"
                                   value={passwordChangeData.newPwConfirm}
                                   onChange={handlePasswordInputChange}
                                   onBlur={() => validatePassword(passwordChangeData.newPw, passwordChangeData.newPwConfirm)}
                                   error={!!passwordConfirmError}
                                   helperText={passwordConfirmError}
                                   fullWidth/>
                        <BasicInfoChangeButton onClick={handleChangePassword}>변경하기</BasicInfoChangeButton>
                    </FormContainer>
                </ModifyFormContainer>
            </>
        }
    </SectionContainer>);
};

export default AccountModifyForm;

const ModifyFormContainer = styled.div`
  display: flex;
  width: 600px;
  border: 1px solid ${COLOR.GRAY_200};
  border-radius: 6px;
  justify-content: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 20px;
  border-radius: 6px;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
`;

export const ProfilePictureWrap = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ProfilePictureButton = styled(Button)`
  width: 200px;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid ${COLOR.GRAY_300};
  background-color: white;
  color: ${COLOR.GRAY_400};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const BasicInfoChangeButton = styled(Button)`
  width: 200px;
  height: 40px;
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE}
`;