import {privateApi} from "../api";
import {API_PATHS} from "../../constants/path";

export const getPopularVideos = async (regionCode, pageToken) => {
    const response = await privateApi.get(API_PATHS.POPULAR_VIDEOS, {
        params: {
            regionCode: regionCode,
            pageToken: pageToken
        }
    });

    return response.data;
}

export const getPopularNews = async (country, page) => {
    const response = await privateApi.get(API_PATHS.POPULAR_NEWS, {
        params: {
            country: country,
            page: page
        },
    });

    return response.data;
}