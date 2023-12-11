export const PATHS = {
    HOME: "/",
    LOGIN: "/auth/login",
    LOGIN_GOOGLE: "",
    SIGN_UP: "/members/sign-up",
    SEND_VERIFICATION_MAIL: "/auth/mail/send",
    CONFIRM_VERIFICATION_CODE: "/auth/mail/verify/code",
    CHECK_EMAIL_DUPLICATION: "/auth/mail/verify/duplication",
    FIND_PW: "/find-password",

};

export const CLIENT_PATHS = {
    HOME: "/",
    LOGIN: "/login",
    LOGIN_SUCCESS: "/oauth2/redirect",
    SIGN_UP: "/sign-up",
    OAUTH2_SIGN_UP: "/sign-up/oauth2",
    RESET_PASSWORD: "/help/reset-password",
    EXPLORE: "/explore",
    FEED: "/feeds",
    PEOPLE: "/people",
    MEMBER: "/members/",
    MEMBERS: "/members/:memberId",
    MANAGE_COMMENT: "/mypage/comment",
    MANAGE_LIKE: "/mypage/like",
    MYPAGE: "/mypage/:page",
    MYPAGE_HOME: "/mypage/home",
    MYPAGE_MODIFY: "/mypage/modify",
    MYPAGE_WITHDRAW: "/mypage/withdraw",
}

export const API_PATHS = {
    LOGOUT: "/auth/logout",
    OAUTH2_SIGN_UP: "/members/sign-up/oauth2",
    REFRESH_TOKEN: "/auth/token/refresh",
    SEND_PASSWORD_CHANGE_TOKEN: "/auth/help/reset-password",
    CHANGE_PASSWORD: "/auth/help/reset-password/confirm",
    POPULAR_VIDEOS: "/explore/popular/videos",
    POPULAR_NEWS: "/explore/popular/news",
    WITHDRAW: "/members/withdraw",
    OAUTH2_USER_WITHDRAW: "/members/withdraw/oauth2",
    SUBSCRIBE_NOTIFICATION: "/api/notifications/subscribe",
    LOGIN_GUEST: "/auth/login/guest",
}

export default PATHS;