import {Navigate, Outlet} from "react-router-dom";
import {CLIENT_PATHS} from "../constants/path";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authState, isLoggedInSelector} from "../recoil/auth";
import {useEffect} from "react";

const ProtectedRoute = () => {
    const isLoggedIn = useRecoilValue(isLoggedInSelector);
    const setAuthState = useSetRecoilState(authState);
    const accessToken = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_STORAGE_KEY);

    useEffect(() => {
        if (!accessToken) {
            setAuthState(false);
        }
    }, []);

    return isLoggedIn ? <Outlet/> : <Navigate to={CLIENT_PATHS.LOGIN} replace/>
};

export default ProtectedRoute;