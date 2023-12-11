import {privateApi, publicApi} from "../api";
import PATH, {API_PATHS} from "../../constants/path";

export const sendVerificationCode = async (email) => {
    const response = await publicApi.post(PATH.SEND_VERIFICATION_MAIL, email);
    return response.data;
}

export const confirmCode = async (code) => {
    const response = await publicApi.post(PATH.CONFIRM_VERIFICATION_CODE, code);
    return response.data;
}

export const checkEmailDuplication = async (email) => {
    const response = await publicApi.post(PATH.CHECK_EMAIL_DUPLICATION, email);
    return response.data;
}

export const signUp = async (signUpData) => {
    const response = await publicApi.post(PATH.SIGN_UP, signUpData);
    return response.data;
}

export const oAuth2SignUp = async (oAuth2SignUpData) => {
    const response = await publicApi.post(API_PATHS.OAUTH2_SIGN_UP, oAuth2SignUpData);
    return response.data;
}

export const login = async (email, password) => {
    const response = await publicApi.post(PATH.LOGIN, {email, password});
    return response.data;
}

export const resetPassword = async (passwordChangeData) => {
    const response = await publicApi.post(API_PATHS.CHANGE_PASSWORD, passwordChangeData);
    return response.data;
}


export const logout = async (accessToken) => {
    const response = await privateApi.post(API_PATHS.LOGOUT, {accessToken: accessToken});
    return response.data;
}

export const withdraw = async (password) => {
    const response = await privateApi.delete(API_PATHS.WITHDRAW, {data: {password: password}});
    return response.data;
}

export const oAuth2UserWithdraw = async () => {
    const response = await privateApi.delete(API_PATHS.OAUTH2_USER_WITHDRAW);
    return response.data;
}

export const loginGuest = async () => {
    const response = await publicApi.post(API_PATHS.LOGIN_GUEST);
    return response.data;
}