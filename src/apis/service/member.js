import {privateApi} from "../api";

export const getMyInfo = async () => {
    const response = await privateApi.get("/members/my-info");
    return response.data;
}

export const getMemberDetail = async (id) => {
    const response = await privateApi.get(`/members/${id}`);
    return response.data;
}

export const searchMembers = async (searchParam) => {
    const {page, country, gender, ageRange, nickname, hideFollowers} = searchParam;
    const response = await privateApi.get("/members/search", {
        params: {
            page: page,
            country: country,
            gender: gender,
            ageRange: ageRange,
            nickname: nickname,
            hideFollowers: hideFollowers,
        },
    });
    return response.data;
}

export const modifyMyInfo = async (memberId, modifyData) => {
    const response = await privateApi.patch(`/members/${memberId}`, modifyData);
    return response.data;
}

export const toggleFollow = async (memberId) => {
    const response = await privateApi.post(`/members/${memberId}/follow`);
    return response.data;
}

export const changePassword = async (passwordChangeData) => {
    const response = await privateApi.patch("/members/me/modify/password", {
        currentPw: passwordChangeData.currentPw,
        newPw: passwordChangeData.newPw,
        newPwConfirm: passwordChangeData.newPwConfirm,
    });
    return response.data;
}

export const getActivities = async (memberId) => {
    const response = await privateApi.get(`/activities/${memberId}`);
    return response.data;
}

export const readActivity = async (activityId) => {
    const response = await privateApi.patch(`/activities/read/${activityId}`);
    return response.data;
}

export const readAllActivities = async () => {
    const response = await privateApi.patch(`/activities/read/all`);
    return response.data;
}

export const getFollowers = async (memberId, page = 0) => {
    const response = await privateApi.get(`/members/${memberId}/followers`, {
        params: {
            page: page,
        },
    });
    return response.data;
}

export const getFollowings = async (memberId, page = 0) => {
    const response = await privateApi.get(`/members/${memberId}/followings`, {
        params: {
            page: page,
        },
    });
    return response.data;
}