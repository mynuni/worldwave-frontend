import React, {useState} from 'react';
import {TextField} from "@mui/material";
import Button from "../common/Button/Button";
import styled from "styled-components";
import COLOR from "../../constants/color";
import {login} from "../../apis/service/auth";
import {useNavigate} from "react-router-dom";
import Path from "../../constants/path";

const LoginForm = () => {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleBlur = (e) => {
        const {name, value} = e.target;
        console.log(name + ", " + value);
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await login(loginData);
        setIsLoading(false);
        navigate(Path.EXPLORE);
    }

    return (
        <>
            <TextField type="text"
                       label="Email"
                       name="email"
                       onBlur={handleBlur}
                       disabled={isLoading}
                       fullWidth/>
            <TextField type="password"
                       label="Password"
                       name="password"
                       disabled={isLoading}
                       onBlur={handleBlur}
                       fullWidth/>
            <StyledLoginButton type="submit"
                               onClick={handleLogin}
                               disabled={isLoading}>{isLoading ? "처리 중.." : "로그인"}</StyledLoginButton>
        </>
    );
};

export default LoginForm;

const StyledLoginButton = styled(Button)`
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  height: 50px;
  width: 100%;

  &:hover {
    filter: brightness(110%);
  }

`;