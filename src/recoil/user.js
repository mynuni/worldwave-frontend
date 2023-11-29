import {atom, selector} from "recoil";
import {isLoggedInSelector} from "./auth";
import {getMyInfo} from "../apis/service/member";

export const userSelector = selector({
    key: 'userSelector',
    get: async ({ get }) => {
        const isLoggedIn = get(isLoggedInSelector);
        if (isLoggedIn) {
            try {
                const response = await getMyInfo();
                return response;
            } catch (error) {
                return {};
            }
        } else {
            return {};
        }
    },
});

export const userState = atom({
    key: "userState",
    default: userSelector
});

