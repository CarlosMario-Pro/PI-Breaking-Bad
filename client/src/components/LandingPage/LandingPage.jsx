import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage () {
    return (
        <div>
            <h1>Bienbenidos a mi súper página...</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
            <p>This App was developed as an Individual Project for the Full-Stack Development Bootcamp "SoyHenry"</p>
            <p>The source code is available on <a href="https://github.com/Carlos-Mario77" target="_blank" rel="noopener noreferrer">https://github.com/Carlos-Mario77</a></p>
            <p>Github: <a href="https://github.com/Carlos-Mario77" target="_blank" rel="noopener noreferrer">Carlos Mario</a></p>

        </div>
    );
};