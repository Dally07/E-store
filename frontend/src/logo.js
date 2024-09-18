import React from "react";
import logo from './assets/COMPUTER LOGO.png'

const Logo = () => {
    return(
        <div className="flex justify-center mt-8">
            <img src={logo}
            alt="computer store logo"
            className="h-24 w-auto shadow-2xl rounded-full"/>
        </div>
    )
};

export default Logo;