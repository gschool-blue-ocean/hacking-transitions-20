import React, { useState, useEffect } from "react";
import './Header.css';
import logo from './logo.svg';
import { useUser } from "../UserProvider.jsx";

// import Login from './Login/Login.jsx';

export default function Header(){
    const [ email, setEmail ] = useState("");
    const user = useUser(); 
    const userLoggedIn = user && user.user ? `${user.user.firstname} ${user.user.lastname}` : null;
    const svgCode = decodeURIComponent(" xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D .st1%7Bfill:%23EF6E47;%7D .st2%7Bfill:%233F64DD;%7D .st3%7Bfill:%230D0F4A;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st3' d='M256.3,15.9c-0.6,0-1,0.4-1,1v28.8L244,16.5c-0.2-0.4-0.5-0.6-0.9-0.6l-9.4,0c-0.5,0-1,0.4-1,1v30.1 c0,0.6,0.5,1,1,1l3.7,0c0.6,0,1-0.4,1-1V18.2l11.1,29.1c0.2,0.4,0.5,0.6,0.9,0.6l9.6,0c0.6,0,1-0.4,1-1l0-30.1c0-0.6-0.4-1-1-1 L256.3,15.9z'/%3E%3Cpath class='st3' d='M272.4,15.9l-3.7,0c-0.5,0-1,0.4-1,1l0,30.1c0,0.6,0.5,1,1,1l3.7,0c0.5,0,1-0.4,1-1l0-30.1 C273.4,16.3,273,15.9,272.4,15.9z'/%3E%3Cpath class='st3' d='M302.8,26.4v-9.5c0-0.6-0.4-1-1-1l-20.7,0c-0.5,0-1,0.4-1,1v3.7c0,0.6,0.4,1,1,1l19.3,0l-19.9,14.9 c-0.2,0.2-0.4,0.5-0.4,0.8v9.7c0,0.6,0.5,1,1,1l20.7,0c0.6,0,1-0.4,1-1v-3.7c0-0.6-0.4-1-1-1l-19.5,0l20.1-15.1 C302.7,27,302.8,26.7,302.8,26.4z'/%3E%3Cpath class='st3' d='M112.1,31.9c0,1.4-0.1,2.8-0.4,4c-1.7,7.7-8.1,12.5-15.6,12.5c-8.8,0-16-6.5-16-16.6c0-2.1,0.3-4.1,0.9-5.9 c1.8-5.6,6.1-9.2,11.5-10.3c1.1-0.2,2.3-0.4,3.6-0.4c6,0,11.2,2.8,14,7.8c0.4,0.7-0.1,1.5-0.9,1.5h-4.5c-0.3,0-0.6-0.1-0.8-0.4 c-0.7-0.8-1.6-1.5-2.6-2C99.7,21.4,97.9,21,96,21c-1.3,0-2.5,0.2-3.6,0.5c-2.3,0.7-4.3,2.2-5.5,4.5c-0.8,1.6-1.3,3.5-1.3,5.9 c0,6.9,4.4,10.9,10.3,10.9c4.5,0,8.3-2.4,9.8-6.8H97c-0.6,0-1-0.4-1-1v-3.6c0-0.6,0.4-1,1-1h14c0.5,0,1,0.4,1,1 C112.1,31.5,112.1,31.7,112.1,31.9z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st1' d='M64,31.9C64,47.8,52.5,61,37.3,63.5c-0.8,0.1-1.6,0.2-2.4,0.3c-0.6,0.1-1.1-0.4-1.1-1v-8.6 c0-0.5,0.4-0.9,0.9-1c0.9-0.1,1.8-0.3,2.6-0.5c1.1-0.3,2.1-0.6,3.1-1c2.6-1.1,4.9-2.6,6.8-4.6c2-2,3.5-4.3,4.6-6.8 c1.1-2.7,1.7-5.5,1.7-8.4c0-2.9-0.6-5.7-1.7-8.4c-1.1-2.6-2.6-4.9-4.6-6.8c-2-2-4.3-3.5-6.8-4.6c-1-0.4-2.1-0.8-3.1-1v3.6 C44.7,16.9,50,23.8,50,31.9c0,8.1-5.4,15-12.7,17.2c-0.8,0.2-1.5,0.4-2.3,0.5c-0.6,0.1-1.2-0.4-1.2-1v-1.5c0-0.5,0.4-0.9,0.9-1 c0.9-0.2,1.8-0.4,2.7-0.7c3.2-1.3,6-3.7,7.8-7.1c0.3-0.6,0.6-1.2,0.8-1.9c1.7-5.5,0.3-11-3.5-14.8c-1.4-1.4-3.1-2.6-5-3.3 c-0.9-0.3-1.7-0.6-2.7-0.7c-0.5-0.1-0.9-0.5-0.9-1V8c0-0.6,0.5-1.1,1.1-1c0.8,0.1,1.6,0.2,2.4,0.4C48.6,9.9,57,19.9,57,31.9 c0,12-8.5,22-19.8,24.5v3.6c2-0.4,4-1,5.8-1.8c3.4-1.4,6.4-3.5,9.1-6.1c2.6-2.6,4.7-5.7,6.1-9.1c1.5-3.5,2.2-7.2,2.2-11.1 s-0.8-7.6-2.2-11.1c-1.4-3.4-3.5-6.4-6.1-9.1c-2.6-2.6-5.7-4.7-9.1-6.1c-1.9-0.8-3.8-1.4-5.8-1.8c-0.9-0.2-1.7-0.3-2.6-0.4 c-0.5,0-0.9-0.5-0.9-1V1c0-0.6,0.5-1,1.1-1c0.8,0.1,1.6,0.2,2.4,0.3C52.5,2.8,64,16,64,31.9z'/%3E%3Cpath class='st3' d='M12.2,23.5c-1.1,2.7-1.7,5.5-1.7,8.4c0,2.9,0.6,5.7,1.7,8.4c1.1,2.6,2.6,4.9,4.6,6.8c2,2,4.3,3.5,6.8,4.6 c1,0.4,2.1,0.8,3.1,1v-3.6C19.4,46.9,14,40,14,31.9c0-8.1,5.4-15,12.7-17.2c0.8-0.2,1.5-0.4,2.3-0.5c0.6-0.1,1.2,0.4,1.2,1v1.5 c0,0.5-0.4,0.9-0.9,1c-0.9,0.2-1.8,0.4-2.7,0.7c-3.2,1.3-6,3.7-7.8,7.1c-0.3,0.6-0.6,1.2-0.8,1.9c-1.7,5.5-0.2,11,3.6,14.8 c1.4,1.4,3.1,2.6,5,3.3c0.9,0.3,1.7,0.6,2.7,0.7c0.5,0.1,0.9,0.5,0.9,1v8.6c0,0.6-0.5,1.1-1.1,1c-0.8-0.1-1.6-0.2-2.4-0.4 C15.5,54,7,43.9,7,31.9c0-12,8.5-22,19.8-24.5V3.9c-2,0.4-4,1-5.8,1.8c-3.4,1.4-6.4,3.5-9.1,6.1c-2.6,2.6-4.7,5.7-6.1,9.1 C4.3,24.3,3.5,28,3.5,31.9S4.3,39.5,5.7,43c1.4,3.4,3.5,6.4,6.1,9.1c2.6,2.6,5.7,4.7,9.1,6.1c1.9,0.8,3.8,1.4,5.8,1.8 c0.9,0.2,1.7,0.3,2.6,0.4c0.5,0,0.9,0.5,0.9,1v1.5c0,0.6-0.5,1-1.1,1c-0.8-0.1-1.6-0.2-2.4-0.3C11.6,61,0,47.8,0,31.9 C0,16,11.6,2.8,26.8,0.3c0.8-0.1,1.6-0.2,2.4-0.3c0.6-0.1,1.1,0.4,1.1,1v8.6c0,0.5-0.4,0.9-0.9,1c-0.9,0.1-1.8,0.3-2.6,0.5 c-1.1,0.3-2.1,0.6-3.1,1c-2.6,1.1-4.9,2.6-6.8,4.6S13.3,21,12.2,23.5z'/%3E%3C/g%3E%3C/svg%3E%0A");

    ;
    useEffect(() => {
        // console.log(userLoggedIn);
      }, [user]);
    
     



    
    // useEffect(() => {
    //     fetch(`http://localhost:3000/api/users`)
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => console.log(error));
    // }, []);

    return(
        <span id="header">
            <span id="home-container">
                <a href="https://www.galvanize.com/">
                    {/* <img src="s:www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background.png" alt="Galvanize Logo" /> */}
                    {/* <img className = "logoImg" src = "logo.png" alt = "Logo" title = "Galvanize logo"/> 
                    <img src={svgCode} alt="Galvanize Logo" className="primarylogo" /> */}
                    {/* <Logo /> */}
                    <img width="259" height="50" src="https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background.png" class="skip-lazy logo-desktop" alt="Galvanize homepage" decoding="async" aria-label="Galvanize homepage" srcset="https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background.png 315w, https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background-232x45.png 232w, https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background-150x29.png 150w, https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_small-scale_full-color_dark-background-250x48.png 250w" sizes="(max-width: 259px) 100vw, 259px"></img>
                </a>
            </span>
            <span id="title-container">
                <h1 id="title">Hacking Transitions</h1>
            </span>
            <span id="greeting-container">
            {userLoggedIn && <h3 id="greeting">Hello, {userLoggedIn}</h3>}               
            </span>
        </span>
    )
}