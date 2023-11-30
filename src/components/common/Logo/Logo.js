import React from 'react';
import {ReactComponent as LogoFullName} from "../../../assets/logo-full.svg"
import {NavLink} from "react-router-dom";

const Logo = () => {
    return (
        <NavLink to={"/"}>
            <LogoFullName/>
        </NavLink>
    );
};

export default Logo;