import {atom, selector} from "recoil";

export const authState = atom({
    key: "authState",
    default: localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY) !== null
});

export const isLoggedInSelector = selector({
    key: "isLoggedInSelector",
    get: ({get}) => !!get(authState)
});