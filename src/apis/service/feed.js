import {privateApi} from "../api";

export const getPost = async (postId) => {
    const response = await privateApi.get(`/posts/${postId}`);
    return response.data;
}

export const getPosts = async (page, sort) => {
    const response = await privateApi.get(`/posts?page=${page}&sort=${sort}`);
    return response.data;
};

export const getPostsByMemberId = async (memberId, page) => {
    const response = await privateApi.get(`/posts/member/${memberId}?page=${page}`);
    return response.data;
}

export const deletePost = async (postId) => {
    const response = await privateApi.delete(`/posts/${postId}`);
    return response.data;
}

export const toggleLike = async (postId) => {
    const response = await privateApi.post(`/posts/${postId}/like`);
    return response.data;
}

export const getComments = async (postId, page) => {
    const response = await privateApi.get(`/posts/${postId}/comments?page=${page}`);
    return response.data;
}

export const createComment = async (postId, content) => {
    const response = await privateApi.post(`/posts/${postId}/comments`, {content: content});
    return response.data;
}

export const updateComment = async (postId, commentId, content) => {
    const response = await privateApi.put(`/posts/${postId}/comments/${commentId}`, {content: content});
    return response.data;
}

export const deleteComment = async (postId, commentId) => {
    const response = await privateApi.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
}

