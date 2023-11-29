import React from 'react';
import styled from "styled-components";
import {Navigate, Outlet} from "react-router-dom";
import {useRecoilValue} from "recoil";
import NavigationBar from "../components/common/NavigationBar/NavigationBar";
import {isLoggedInSelector} from "../recoil/auth";
import {CLIENT_PATHS} from "../constants/path";

export const NavLayout = () => {
    return (
        <>
            <DefaultLayout>
                <NavigationBar/>
                <Outlet/>
            </DefaultLayout>
        </>
    );
};

export const Layout = () => {

    const isLoggedIn = useRecoilValue(isLoggedInSelector);

    if (isLoggedIn) {
        return <Navigate to={CLIENT_PATHS.EXPLORE} replace/>
    }

    return (
        <>
            <DefaultLayout>
                <Outlet/>
            </DefaultLayout>
        </>
    );
};

const DefaultLayout = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
`;