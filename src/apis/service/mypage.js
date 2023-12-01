import {privateApi} from "../api";

export const getMyComments = async (page) => {
    const response = await privateApi.get(`/mypage/comments?page=${page}`);
    return response.data;
}

export const getMyLikes = async () => {
    const response = await privateApi.get("/mypage/likes");
    return response.data;
}

export const deleteComments = async (commentIds) => {
    const response = await privateApi.delete("/mypage/comments", {
        data: commentIds
    });
    return response.data;
}