import React, {useEffect} from 'react';

const LoginSuccess = () => {

    const accessToken = new URLSearchParams(window.location.search).get("accessToken");

    useEffect(() => {
        localStorage.clear();
        localStorage.setItem("accessToken", accessToken);
        window.location.replace("/");
    }, []);

    return (
        <>
        </>
    );
};

export default LoginSuccess;