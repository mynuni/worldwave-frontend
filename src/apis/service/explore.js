import {privateApi} from "../api";
import {API_PATHS} from "../../constants/path";

export const getPopularVideos = async (regionCode, pageToken) => {
    const response = await privateApi.get(API_PATHS.POPULAR_VIDEOS, {
        params: {
            regionCode,
            pageToken,
        },
    });

    return response.data;
}

export const getPopularNews = async (country, pageNum) => {
    const response = await privateApi.get(API_PATHS.POPULAR_NEWS, {
        params: {
            country
        },
    });

    return response.data;
}